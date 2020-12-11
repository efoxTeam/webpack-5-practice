const WebpackChain = require('webpack-chain')
const config = new WebpackChain()
const node_env = process.env.NODE_ENV || 'development'
const deploy_env = process.env.DEPLOY_ENV || ''
module.exports = () => {
  require('./common')(config, {node_env, deploy_env})
  require(`./${node_env}`)(config, {node_env, deploy_env})
  //
  if (process.env.SHOW_CONFIG) console.log(config.toString()) // 检测webpack config
  const wpc = config.toConfig()
  if (node_env === 'production') wpc.optimization.minimizer.push('...') //fix webpack-chain config.optimization.minimizer 不能加 '...' 的问题
  return wpc
}
