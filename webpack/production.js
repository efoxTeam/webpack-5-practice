const paths = require('./paths')
const {merge} = require('webpack-merge')
const common = require('./common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
  },
  plugins: [
    // 将CSS提取到单独的文件中
    // 注意: style-loader 为开发环境, MiniCssExtractPlugin 生产环境
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                hideNothingWarning: true, // 屏蔽没有.postcss.config 文件时报错的问题
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
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
})
