const path = require('path')
const fs = require('fs-extra')

const appDirectory = fs.realpathSync(process.cwd())
module.exports = {
  app: appDirectory,
  src: path.resolve(appDirectory, 'src'),
  src: path.resolve(appDirectory, 'node_module'),
  src: path.resolve(appDirectory, 'template'),
}
