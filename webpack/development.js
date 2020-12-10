const paths = require('./paths')

const webpack = require('webpack')
const {merge} = require('webpack-merge')
const common = require('./common.js')

module.exports = merge(common, {
  // 设置构建为 development 模式
  mode: 'development',

  // 如何生成sourceMap
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval',

  // 启动服务器以快速开发
  devServer: {
    contentBase: [paths.public],
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8000,
  },
})
