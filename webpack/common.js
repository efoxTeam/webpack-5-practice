const paths = require('./paths')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: [paths.src + '/index.js'],

  // 输出的静态资源 和 模块
  output: {
    path: paths.build,
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    // es5 兼容性设置
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      forOf: false,
      dynamicImport: false,
      module: false,
    },
    // 自动适配 module federation 域名
    publicPath: 'auto',
  },

  // 自定义bundle 生成结果
  plugins: [
    // 清除构建资源
    new CleanWebpackPlugin(),

    // 复制 public 文件到 生成的目标文件夹
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // 生成 HTML 模板
    new HtmlWebpackPlugin({
      title: 'Webpack 5 Practice',
      favicon: paths.template + '/favicon.png', // favicon 文件
      template: paths.template + '/index.html', // 模板文件
      filename: 'index.html', // 项目的入口文件名
    }),
  ],

  // 确定如何处理项目中的模块
  module: {
    rules: [
      // JavaScript: 使用 babel编译JS文件
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},

      // Styles: 插入 CSS 和 sourceMap 到 head
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                hideNothingWarning: true, // 屏蔽没有.postcss.config 文件时报错的问题
              },
            },
          },
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
      // asset 为 webpack 5 文件新特征
      // https://webpack.js.org/guides/asset-modules/
      // Images: 将图像文件复制到生成文件夹
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts & SVGs: 内联文件
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
    ],
  },
}
