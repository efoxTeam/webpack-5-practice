const paths = require('./paths')
const {execSync} = require('child_process')
//
module.exports = (config, {node_env, deploy_env}) => {
  const conf = {
    // 设置构建为 development 模式
    mode: 'development',
    // 如何生成sourceMap
    // https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',
    // 启动服务器以快速开发
    devServer: {
      contentBase: [paths.public],
      historyApiFallback: true,
      contentBase: paths.build,
      open: false,
      overlay: true,
      compress: true,
      hot: true,
      port: 8000,
      host: 'localhost',
      onListening: server => {
        const protocol = this.https ? 'https' : 'http'
        const port = server.listeningApp.address().port || 8000
        const host = server.hostname || 'localhost'
        execSync('ps cax | grep "Google Chrome"')
        execSync(`osascript chrome.applescript "${encodeURI(`${protocol}://${host}:${port}`)}"`, {
          cwd: __dirname,
          stdio: 'ignore',
        })
      },
    },
  }
  config.merge(conf)
}
