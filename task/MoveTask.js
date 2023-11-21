const fs = require('fs')
const through = require('through2')
const JSZip = require('jszip')
const del = require('del')
const { parseId } = require('../util')
const { dataDir } = require('../config.js')

/**
* Moves files from backup to a zip file.
* @param {string} zipFile - The path to the zip file.
* @param {string} path - The path to the data directory containing files to be restored
* @param {string[]} filesToAdd - An array of filenames to add to the zip file.
* @returns {Promise} A Promise that resolves when the operation is complete.
*/
function restoreFiles (zipFile, path, filesToAdd) {
  return new Promise((resolve, reject) => {
    const newZip = new JSZip()
    fs.readFile(zipFile, function (err, data) {
      if (err) {
        process.stdout.write(`Error reading file ${err.message} \n`)
        reject(err)
      } else {
        newZip.loadAsync(data).then(zip => {
          filesToAdd.forEach((file) => {
            try {
              const filePath = `${path}/${file}`
              const fileData = fs.readFileSync(filePath)
              if (fileData) {
                zip.file(`${file}`, fileData)
              }
            } catch (e) {
              resolve(e)
            }
          })
          zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
            fs.writeFileSync(zipFile, content)
            resolve()
          }).catch(e => reject(e))
        })
      }
    })
  })
}

/**
 * Extracts files from a zip archive and saves them to disk.
 * @param {string} filePath - The path to the zip archive.
 * @param {string[]} filesToExtract - An array of filenames to extract from the archive.
 * @param {string} path - The path to the data directory where files are put
 * @returns {Promise} A Promise that resolves when the operation is complete.
 */
function backupFiles (filePath, filesToExtract, path) {
  if (filePath) {
    const zip = new JSZip()
    zip.loadAsync(fs.readFileSync(filePath)).then(() => {
      const promises = filesToExtract.map(fileName => {
        const file = Object.keys(zip.files).find((name) => name.endsWith(`${fileName}`))
        if (file) {
          return zip.file(file).async('nodebuffer').then((fileData) => {
            fs.writeFileSync(`${path}/${fileName}`, fileData)
            process.stdout.write(`${fileName} stored to ${path} \n`)
          })
        } else {
          return Promise.resolve()
        }
      })
      return Promise.all(promises)
    })

    return Promise.resolve(false)
  } else {
    process.stdout.write('No file ', filePath, ' found')
    return Promise.resolve(false)
  }
}

function tmpPath (fileName) {
  const id = parseId(fileName)
  return `${dataDir}/tmp/${id}`
}

module.exports = {
  backupTask: names => {
    if (!names?.length) {
      return through.obj(function (file, encoding, callback) {
        callback(null, file)
      })
    }
    return through.obj(function (file, encoding, callback) {
      const localFile = file.history[file.history.length - 1]
      const path = tmpPath(localFile)
      // Create a temp file for files to be backed up.
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }
      backupFiles(localFile, names, path).then(status => {
        callback(null, file)
      })
    })
  },

  restoreTask: names => {
    if (!names?.length) {
      return through.obj(function (file, encoding, callback) {
        callback(null, file)
      })
    }
    return through.obj(function (file, encoding, callback) {
      const localFile = file.history[file.history.length - 1]
      const path = tmpPath(localFile)
      restoreFiles(localFile, path, names).then(() => {
        del(`${dataDir}/tmp/**`)
        callback(null, file)
      })
    })
  }
}
