const { mapSrc } = require('../task/Common')

module.exports = {
  id: 'kela',
  src: [
    mapSrc('kela', 'https://koontikartta.navici.com/tiedostot/gtfs_kela.zip'),
    mapSrc('matkahuolto', mhAddress, false, ['kela/gtfs-rules/matkahuolto.rule'], { 'transfers.txt': null }),
    mapSrc('lansilinjat', 'https://lansilinjat.fi/wp-content/uploads/GTFS-Lansilinjat.zip', false, ['kela/gtfs-rules/remove-route-color.rule'])
  ],
  osm: ['finland']
}