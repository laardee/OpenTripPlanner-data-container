const JSZip = require('jszip')
const fs = require('fs')
const converter = require('json-2-csv')
const through = require('through2')
const cloneable = require('cloneable-readable')
const path = require('path')

function createAgency(zip, file, csv, cb) {
  zip.file('agency.txt', csv)
  zip.generateNodeStream({ streamFiles: true, compression: 'DEFLATE' })
    .pipe(fs.createWriteStream(file))
    .on('finish', cb)
}

function setPayIq(file, cb) {
  fs.readFile(file, function (err, data) {
    if (err) {
      return cb(err)
    }
    console.log(file)
    const zip = new JSZip()
    zip.loadAsync(data).then(() => {
      const agency = zip.file('agency.txt')
      agency.async('string').then(function (data) {
        data = data.replace(/http.*?(?=("|,))/gi, 'https://www.payiq.net')
        createAgency(zip, file, data, (error, data) => {
          if (error) {
            return cb(error)
          }
          return cb(null, 'ok')
        })
      });
    });
  })
}

module.exports = {
  /**
   * Amends Operator Details for PayiQ Routes
   */
  amendPayiqOperator: () => {
    return through.obj(function (file, encoding, callback) {
      const gtfsFile = file.history[file.history.length - 1]
      console.log('open', gtfsFile)
      setPayIq(gtfsFile, () => {
        console.log(gtfsFile + ' ID SUCCESS\n')
        callback(null, file)
      })
    })
  }
}
