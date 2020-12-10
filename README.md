# 📦 Webpack 5 Practice 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)   
利用 webpack 5、babel、sass、postcss、webapck-chain 等模块、库实现生产项目构建的实战

## 💻 使用 
+ 安装 `yarn`
+ 调试 `yarn dev`
+ 构建 `yarn build`
+ 正式环境调试 `yarn start`

## 🛠 功能 
+ [Webpack 5](https://webpack.js.org/)
+ [Babel 7](https://babeljs.io/)
+ [Sass](https://sass-lang.com/)
+ [PostCSS 8](https://postcss.org/)

## 🤝 依赖 

### webpack

- [`webpack`](https://github.com/webpack/webpack)
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - webpack 命令行
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - webpack 开发服务
- [`webpack-merge`](https://github.com/survivejs/webpack-merge) - webpack 配置合并
- [`cross-env`](https://github.com/kentcdodds/cross-env) - 跨平台环境命令

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - 将ES6+转换为向后兼容的JavaScript
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - 直接在类上使用属性
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - 智能环境配置

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - 使用 Babel 和 webpack 转译 JavaScript 文件
- [`sass-loader`](https://webpack.js.org/loaders/sass-loader/) -  SCSS 转译 CSS
  - [`sass`](https://sass-lang.com/) - Dart版本的 Sass
- [`postcss-loader`](https://webpack.js.org/loaders/postcss-loader/) - 用postcs处理CSS
  - [`postcss-preset-env`](https://www.npmjs.com/package/postcss-preset-env) - PostCSS 兼容环境默认配置
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - 对 `@import` 和 `url()` 进行处理
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - 把 CSS 插入到 DOM 中

### Plugins

- [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin) - 清除已构建的产物
- [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin) - 复制文件到生产目录
- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin) - 根据模板生成HTML
- [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) - 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载
- [`css-minimizer-webpack-plugin`](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/) - 压缩CSS 文件


## 👋 作者 
+ [Ken.Xu](https://github.com/ckken)
