const paths = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = module.exports = (config, {node_env, deploy_env}) => {
  const conf = {
    mode: 'production',
    devtool: false,
    output: {
      path: paths.build,
      publicPath: '/',
      filename: 'js/[name].[contenthash].js',
    },
    optimization: {
      minimize: true,
      minimizer: {
        css: {
          plugin: CssMinimizerPlugin,
          args: [{}],
        },
      },
      // 此选项将确保它们共享Web包运行时，而不是拥有自己的运行时。
      // 这也有助于实现长期缓存，因为块只会在实际代码更改时更改，而不是在Web包运行时更改。
      // 启动后 暂不支持 Module Federation
      runtimeChunk: {
        name: 'runtime',
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  }
  config.merge(conf)
  // 将CSS提取到单独的文件中
  // 注意: style-loader 为开发环境, MiniCssExtractPlugin 生产环境
  config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
    {
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    },
  ])
  config.module.rule('styles').use('style').loader(MiniCssExtractPlugin.loader)
}
