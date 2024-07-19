const {patchDockerfile, patchLighttpdConf} = require('../util')

const OTP_TAG = process.env.OTP_TAG || 'v2';

module.exports = function () {
  return new Promise((resolve) => {
    patchDockerfile(OTP_TAG, global.storageDirName)
    patchLighttpdConf(global.storageDirName)
    resolve()
  })
}
