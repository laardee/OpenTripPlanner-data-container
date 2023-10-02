/*
 * id = feedid (String)
 * url = feed url (String)
 * fit = mapfit shapes (true/false)
 * rules = OBA Filter rules to apply (array of strings)
 * replacements = replace or remove file from gtfs package (format: {'file_to_replace': 'file_to_replace_with' or null})
 * request options = optional special options for request
 */
const src = (id, url, fit, rules, replacements, requestOptions) => ({ id, url, fit, rules, replacements, requestOptions })

const HSL_CONFIG = {
  'id': 'hsl',
  'src': [
    src('HSL', 'https://infopalvelut.storage.hsldev.com/gtfs/hsl.zip', false, undefined, { 'translations.txt': 'translations_new.txt', 'trips.txt': 'trips2.txt' }),
    src('HSLlautta', 'https://koontikartta.navici.com/tiedostot/gtfs_lautat_digitransit.zip', false),
    src('Sipoo', 'https://koontikartta.navici.com/tiedostot/rae/sipoon_kunta_sibbo_kommun.zip', false)
  ],
  'osm': ['hsl'],
  'dem': 'hsl'
}

const FINLAND_CONFIG = {
  'id': 'finland',
  'src': [
    src('HSL', 'https://infopalvelut.storage.hsldev.com/gtfs/hsl.zip', false, ['router-finland/gtfs-rules/hsl-no-trains.rule', 'router-hsl/gtfs-rules/hsl.rule'], { 'translations.txt': 'translations_new.txt', 'trips.txt': 'trips2.txt' }),
    src('MATKA', 'https://koontikartta.navici.com/tiedostot/gtfs_digitransit.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash', ['router-finland/gtfs-rules/matka-cleaned.rule']),
    src('tampere', 'http://ekstrat.tampere.fi/ekstrat/ptdata/tamperefeed_deprecated.zip', false),
    src('LINKKI', 'https://tvv.fra1.digitaloceanspaces.com/209.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('OULU', 'https://tvv.fra1.digitaloceanspaces.com/229.zip', false),
    src('digitraffic', 'https://rata.digitraffic.fi/api/v1/trains/gtfs-passenger-stops.zip', false, undefined, undefined, { gzip: true }),
    src('Rauma', 'http://digitransit-proxy:8080/out/raumaadmin.mattersoft.fi/feeds/233.zip', false),
    src('Hameenlinna', 'https://tvv.fra1.digitaloceanspaces.com/203.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kotka', 'https://tvv.fra1.digitaloceanspaces.com/217.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kouvola', 'https://tvv.fra1.digitaloceanspaces.com/219.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Lappeenranta', 'https://tvv.fra1.digitaloceanspaces.com/225.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Mikkeli', 'https://tvv.fra1.digitaloceanspaces.com/227.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Vaasa', 'https://tvv.fra1.digitaloceanspaces.com/249.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Joensuu', 'https://tvv.fra1.digitaloceanspaces.com/207.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('FOLI', 'http://data.foli.fi/gtfs/gtfs.zip', false),
    src('Lahti', 'https://tvv.fra1.digitaloceanspaces.com/223.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kuopio', 'http://karttapalvelu.kuopio.fi/google_transit/google_transit.zip', false),
    src('Rovaniemi', 'https://tvv.fra1.digitaloceanspaces.com/237.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kajaani', 'https://tvv.fra1.digitaloceanspaces.com/211.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Salo', 'https://tvv.fra1.digitaloceanspaces.com/239.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Pori', 'https://tvv.fra1.digitaloceanspaces.com/231.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Viro', 'http://peatus.ee/gtfs/gtfs.zip', false),
    src('Vikingline', 'https://fgwgtfsprod.blob.core.windows.net/gtfsout/latest_VIKINGLINE.zip', false),
    src('Raasepori', 'https://tvv.fra1.digitaloceanspaces.com/232.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('VARELY', 'http://digitransit-proxy:8080/out/varelyadmin.mattersoft.fi/feeds/102.zip', false, undefined)
  ],
  'osm': ['finland', 'estonia']
}

const WALTTI_CONFIG = {
  'id': 'waltti',
  'src': [
    src('Hameenlinna', 'https://tvv.fra1.digitaloceanspaces.com/203.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kotka', 'https://tvv.fra1.digitaloceanspaces.com/217.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kouvola', 'https://tvv.fra1.digitaloceanspaces.com/219.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Lappeenranta', 'https://tvv.fra1.digitaloceanspaces.com/225.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Mikkeli', 'https://tvv.fra1.digitaloceanspaces.com/227.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Vaasa', 'https://tvv.fra1.digitaloceanspaces.com/249.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Joensuu', 'https://tvv.fra1.digitaloceanspaces.com/207.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('FOLI', 'http://data.foli.fi/gtfs/gtfs.zip', false),
    src('Lahti', 'https://tvv.fra1.digitaloceanspaces.com/223.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kuopio', 'http://karttapalvelu.kuopio.fi/google_transit/google_transit.zip', false),
    src('OULU', 'https://tvv.fra1.digitaloceanspaces.com/229.zip', false),
    src('LINKKI', 'https://tvv.fra1.digitaloceanspaces.com/209.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('tampere', 'http://ekstrat.tampere.fi/ekstrat/ptdata/tamperefeed_deprecated.zip', false),
    src('Rovaniemi', 'https://tvv.fra1.digitaloceanspaces.com/237.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('digitraffic', 'https://rata.digitraffic.fi/api/v1/trains/gtfs-passenger-stops.zip', false, undefined, undefined, { gzip: true }),
    src('tampereDRT', 'https://ekstrat.tampere.fi/ekstrat/ptdata/tamperefeed_kutsuliikenne.zip', false),
    src('Pori', 'https://tvv.fra1.digitaloceanspaces.com/231.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('FUNI', 'https://foligtfs.blob.core.windows.net/routeplanner/gtfs-foli-ff.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Raasepori', 'https://tvv.fra1.digitaloceanspaces.com/232.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('RaaseporiELY', 'https://koontikartta.navici.com/tiedostot/gtfs_raasepori.zip', false)
  ],
  'osm': ['finland'],
  'dem': 'waltti'
}

const WALTTI_ALT_CONFIG = {
  'id': 'waltti-alt',
  'src': [
    src('Salo', 'https://tvv.fra1.digitaloceanspaces.com/239.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash'),
    src('Kajaani', 'https://tvv.fra1.digitaloceanspaces.com/211.zip', 'gtfs_shape_mapfit/fit_gtfs_stops.bash')
  ],
  'osm': ['finland']
}

const VARELY_CONFIG = {
  'id': 'varely',
  'src': [
    src('VARELY', 'http://digitransit-proxy:8080/out/varelyadmin.mattersoft.fi/feeds/102.zip', false, undefined),
    src('FOLI', 'http://data.foli.fi/gtfs/gtfs.zip', false),
    src('Rauma', 'http://digitransit-proxy:8080/out/raumaadmin.mattersoft.fi/feeds/233.zip', false)
  ],
  'osm': ['finland']
}

const KELA_CONFIG = {
  'id': 'kela',
  'src': [
    src('kela', 'https://koontikartta.navici.com/tiedostot/gtfs_kela.zip', false),
    src('matkahuolto', 'http://digitransit-proxy:8080/out/minfoapi.matkahuolto.fi/gtfs/kokomaa-fi/gtfs.zip', false, ['router-kela/gtfs-rules/no-onnibus-mega.rule'], { 'transfers.txt': null })
  ],
  'osm': ['finland']
}

let ALL_CONFIGS

const setCurrentConfig = (name) => {
  ALL_CONFIGS = [WALTTI_CONFIG, HSL_CONFIG, FINLAND_CONFIG, WALTTI_ALT_CONFIG, VARELY_CONFIG, KELA_CONFIG].reduce((acc, nxt) => {
    if ((name && name.split(',').indexOf(nxt.id) !== -1) ||
      name === undefined) {
      acc.push(nxt)
    }
    return acc
  }, [])
}

// Allow limiting active configs with env variable
if (process.env.ROUTERS) {
  setCurrentConfig(process.env.ROUTERS.replace(/ /g, ''))
} else {
  setCurrentConfig()
}

// EXTRA_SRC format should be {"FOLI": {"url": "http://data.foli.fi/gtfs/gtfs.zip",  "fit": false, "rules": ["router-waltti/gtfs-rules/waltti.rule"], "routers": ["hsl", "finland"]}}
// but you can only define, for example, new url and the other key value pairs will remain the same as they are defined in this file. "routers" is always a mandatory field.
// It is also possible to add completely new src by defining object with unused id or to remove a src by defining "remove": true
const extraSrc = process.env.EXTRA_SRC !== undefined ? JSON.parse(process.env.EXTRA_SRC) : {}

let usedSrc = []
// add config to every source and override config values if they are defined in extraSrc
for (let i = 0; i < ALL_CONFIGS.length; i++) {
  const cfg = ALL_CONFIGS[i]
  const cfgSrc = cfg.src
  for (let j = cfgSrc.length - 1; j >= 0; j--) {
    const src = cfgSrc[j]
    const id = src.id
    if (extraSrc[id] && extraSrc[id].routers !== undefined && extraSrc[id].routers.includes(cfg.id)) {
      usedSrc.push(id)
      if (extraSrc[id].remove) {
        cfgSrc.splice(j, 1)
        continue
      }
      cfgSrc[j] = { ...src, ...extraSrc[src.id] }
    }
    cfgSrc[j].config = cfg
  }
}

// Go through extraSrc keys to find keys that don't already exist in src and add those as new src
Object.keys(extraSrc).forEach((id) => {
  if (!usedSrc.includes(id)) {
    const routers = extraSrc[id].routers
    for (let i = 0; i < ALL_CONFIGS.length; i++) {
      const cfg = ALL_CONFIGS[i]
      if (routers === undefined || routers.includes(cfg.id)) {
        cfg.src.push({ ...extraSrc[id], id })
      }
    }
  }
})

// create id->src-entry map
const configMap = ALL_CONFIGS.map(cfg => cfg.src)
  .reduce((acc, val) => acc.concat(val), [])
  .reduce((acc, val) => {
    if (acc[val.id] === undefined) {
      acc[val.id] = val
    }
    return acc
  }, {})

const osm = [
  { id: 'finland', url: 'https://karttapalvelu.storage.hsldev.com/finland.osm/finland.osm.pbf' },
  { id: 'hsl', url: 'https://karttapalvelu.storage.hsldev.com/hsl.osm/hsl.osm.pbf' },
  { id: 'estonia', url: 'https://download.geofabrik.de/europe/estonia-latest.osm.pbf' }
]

const dem = [
  { id: 'waltti', url: 'https://elevdata.blob.core.windows.net/elevation/waltti/waltti-10m-elevation-model_20190927.tif' },
  { id: 'hsl', url: 'https://elevdata.blob.core.windows.net/elevation/hsl/hsl-10m-elevation-model_20190920.tif' }
]

const constants = {
  BUFFER_SIZE: 1024 * 1024 * 32
}

module.exports = {
  ALL_CONFIGS: () => ALL_CONFIGS,
  configMap,
  osm,
  osmMap: osm.reduce((acc, val) => { acc[val.id] = val; return acc }, {}),
  dem,
  demMap: dem.reduce((acc, val) => { acc[val.id] = val; return acc }, {}),
  dataToolImage: `hsldevcom/otp-data-tools:${process.env.TOOLS_TAG || 'latest'}`,
  dataDir: process.env.DATA || `${process.cwd()}/data`,
  hostDataDir: process.env.HOST_DATA || `${process.cwd()}/data`,
  setCurrentConfig: setCurrentConfig,
  constants
}
