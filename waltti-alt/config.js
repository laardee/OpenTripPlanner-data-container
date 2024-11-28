const { mapSrc } = require('../task/Common')

module.exports = {
  id: 'waltti-alt',
  src: [
    mapSrc('Salo', 'https://tvv.fra1.digitaloceanspaces.com/239.zip', true),
    mapSrc('Kajaani', 'https://tvv.fra1.digitaloceanspaces.com/211.zip', true)
  ],
  osm: ['finland']
}