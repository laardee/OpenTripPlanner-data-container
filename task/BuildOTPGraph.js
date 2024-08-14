const fs = require('fs')
const { exec, execSync } = require('child_process')
const { zipWithGlob, otpMatching, postSlackMessage } = require('../util')
const { dataDir, constants } = require('../config.js')
const graphBuildTag = process.env.OTP_TAG || 'v2'
const org = process.env.ORG || 'hsldevcom'
const JAVA_OPTS = process.env.JAVA_OPTS || '-Xmx12g'

const buildGraph = function (router) {
  const lastLog = []
  const collectLog = (data) => {
    lastLog.push(data.toString())
    if (lastLog.length > 20) {
      lastLog.splice(0, 1)
    }
  }
  return new Promise((resolve, reject) => {
    const version = execSync(`docker pull ${org}/opentripplanner:${graphBuildTag};docker run --rm --entrypoint /bin/bash ${org}/opentripplanner:${graphBuildTag}  -c "java -jar otp-shaded.jar --version"`)
    const commit = version.toString().match(/commit: ([0-9a-f]+)/)[1]

    const buildGraph = exec(`docker run -v ${dataDir}/build:/opt/opentripplanner/graphs --mount type=bind,source=${dataDir}/../logback-include-extensions.xml,target=/opt/opentripplanner/logback-include-extensions.xml -e ROUTER_NAME=${process.env.ROUTER_NAME} --rm --entrypoint /bin/bash ${org}/opentripplanner:${graphBuildTag}  -c "java ${JAVA_OPTS} -jar otp-shaded.jar --build --save ./graphs/${router.id}"`, { maxBuffer: constants.BUFFER_SIZE })
    // const buildGraph = exec('ls -la');
    const buildLog = fs.openSync(`${dataDir}/build/${router.id}/build.log`, 'w+')

    buildGraph.stdout.on('data', function (data) {
      collectLog(data)
      process.stdout.write(data.toString())
      fs.writeSync(buildLog, data)
    })

    buildGraph.stderr.on('data', function (data) {
      collectLog(data)
      process.stdout.write(data.toString())
      fs.writeSync(buildLog, data)
    })

    buildGraph.on('exit', status => {
      fs.closeSync(buildLog)
      if (status === 0) {
        resolve({ commit, router })
      } else {
        const log = lastLog.join('')
        postSlackMessage(`${router.id} build failed: ${status}:${log} :boom:`)
        reject('could not build') // eslint-disable-line
      }
    })
  })
}

const packData = function (commit, router) {
  const path = `${dataDir}/build/${router.id}`

  const p1 = new Promise((resolve, reject) => {
    process.stdout.write('Creating zip file for router data\n')
    const osmFiles = router.osm.map(osm => `${path}/${osm}.pbf`)

    // create a zip file which includes all data required
    // for graph build and routing: gtfs, osm, dem + otp configs
    zipWithGlob(`${path}/router-${router.id}.zip`,
      [`${path}/*gtfs.zip`, `${path}/*.json`, ...osmFiles, `${path}/${router.dem}.tif`],
      `router-${router.id}`,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
  })
  const p2 = new Promise((resolve, reject) => {
    process.stdout.write('Creating zip file for otp graph\n')
    // create a zip file for routing only
    // include  graph.obj, router-config.json and otp-config.json
    zipWithGlob(`${path}/graph-${router.id}-${commit}.zip`,
      [`${path}/graph.obj`, `${path}/router-config.json`, `${path}/otp-config.json`],
      router.id,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
  })
  const p3 = new Promise((resolve, reject) => {
    fs.writeFile(`${path}/version.txt`, new Date().toISOString(), function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
  return Promise.all([p1, p2, p3])
}

module.exports = {
  buildOTPGraphTask: router => buildGraph(router)
    .then(resp => packData(resp.commit, resp.router))
    .then(() => otpMatching(`${dataDir}/build/${router.id}`))
    .then(() => process.stdout.write('Graph build SUCCESS\n'))
}
