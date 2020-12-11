const paths = require('./paths')
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const WebpackBar = require('webpackbar')
module.exports = (config, {node_env, deploy_env}) => {
  const conf = {
    // 持久化缓存
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [path.resolve(paths.app, 'webpack/config.js'), path.resolve(__filename)],
      },
    },
    // 入口文件
    entry: {index: paths.entry},
    // 实验性项目
    experiments: {
      // mjs: true,
      // outputModule: true,
      topLevelAwait: true, // 开启后 暂时 不支持调试环境 arrow function 转 es5
      // importAsync: true,
      // importAwait: true,
      // asset: true, // file-loader、url-loader、raw-loader,系统已经默认支持
      //wasm
      asyncWebAssembly: true,
      syncWebAssembly: true,
    },
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
    plugin: {
      // 清除构建资源
      CleanWebpackPlugin: {plugin: CleanWebpackPlugin},

      // 复制 public 文件到 生成的目标文件夹
      CopyWebpackPlugin: {
        plugin: CopyWebpackPlugin,
        args: [
          {
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
          },
        ],
      },

      // 生成 HTML 模板
      HtmlWebpackPlugin: {
        plugin: HtmlWebpackPlugin,
        args: [
          {
            title: 'Webpack 5 Practice',
            favicon: paths.template + '/favicon.png', // favicon 文件
            template: paths.template + '/index.html', // 模板文件
            filename: 'index.html', // 项目的入口文件名
          },
        ],
      },
      // ESlint
      ESLintPlugin: {
        plugin: ESLintPlugin,
        args: [
          {
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            // files: ['src'],
            // emitWarning: true,
            // failOnWarning: true,
            eslintPath: require.resolve('eslint'),
            context: paths.src,
            cache: true,
            cacheLocation: path.resolve(paths.app, 'node_modules/.cache/.eslintcache'),
            fix: true,
            threads: true,
            lintDirtyModulesOnly: false,
            cwd: paths.appRoot,
            // outputReport: true,
          },
        ],
      },
      // DotenvWebpack
      DotenvWebpack: {
        plugin: DotenvWebpack,
        args: [
          {
            path: path.resolve(paths.app, `.env_${deploy_env}`), //加载当前文件替代 .envs
            safe: true, // 加载 '.env.example' 验证 '.env' 是否已经都设置.
            allowEmptyValues: true, // 允许空值
            systemvars: true, // 加载所有预定义的'process.env'每个dotenv规范都会胜过任何本地变量。
            silent: true, // 隐藏错误提示
            defaults: false, // 如果没设置 .env 默认加载 '.env.defaults'
          },
        ],
      },
      // WebpackBar
      WebpackBar: {
        plugin: WebpackBar,
        args: [
          {
            reporters: ['fancy'],
          },
        ],
      },
    },

    // 确定如何处理项目中的模块
    module: {
      rule: {
        // JavaScript: 使用 babel编译JS文件
        scripts: {test: /\.js$/, exclude: /node_modules/, use: {babel: {loader: 'babel-loader'}}},

        // Styles: 插入 CSS 和 sourceMap 到 head
        styles: {
          test: /\.(scss|css)$/,
          use: {
            style: {loader: 'style-loader'},
            css: {
              loader: 'css-loader',
              options: {sourceMap: node_env === 'development', importLoaders: node_env === 'development' ? 1 : 2},
            },
            postcss: {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  hideNothingWarning: true, // 屏蔽没有.postcss.config 文件时报错的问题
                },
              },
            },
            sass: {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'), //使用 dart sass 替代 node-sass
                sourceMap: node_env === 'development',
              },
            },
          },
        },
        // asset 为 webpack 5 文件新特征
        // https://webpack.js.org/guides/asset-modules/
        // Images: 将图像文件复制到生成文件夹
        assetResource: {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

        // Fonts & SVGs: 内联文件
        assetInline: {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
      },
    },
  }
  config.merge(conf)
}
