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
    console.log(path.parse(file))
    const gtfsName = path.parse(file).name.replace(/\-gtfs/gi, '');
    const zip = new JSZip()
    zip.loadAsync(data).then(() => {
      const agency = zip.file('agency.txt')
      agency.async('string').then(function (data) {
        let filteredData = data.replace(/\r/g, '')
        if (filteredData.charAt(filteredData.length - 1) === '\n') {
          filteredData = filteredData.slice(0, -1)
        }
        if (filteredData.charCodeAt(0) === 0xFEFF) { // remove BOM
          filteredData = filteredData.substring(1)
        }

        const json = converter.csv2json(filteredData).map(agency => {
          return Object.assign({}, agency, {
            agency_fare_url: `https://www.payiq.net/${gtfsName.toLocaleLowerCase()}#${agency.agency_fare_url}`
          })
        })
        
        const csv = converter.json2csv(json)
        createAgency(zip, file, csv, (error, data) => {
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
