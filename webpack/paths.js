const path = require('path')
const fs = require('fs-extra')

const appDirectory = fs.realpathSync(process.cwd())
module.exports = {
  app: appDirectory,
  src: path.resolve(appDirectory, 'src'),
  build: path.resolve(appDirectory, 'dist'),
  nodeModule: path.resolve(appDirectory, 'node_module'),
  template: path.resolve(appDirectory, 'template'),
  public: path.resolve(appDirectory, 'public'),
  entry: path.resolve(appDirectory, 'src/index.js'),
}
