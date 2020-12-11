const WebpackChain = require('webpack-chain')
const config = new WebpackChain()
const node_env = process.env.NODE_ENV || 'development'
const deploy_env = process.env.DEPLOY_ENV || ''
console.log('process.env.DEPLOY_ENV', process.env.DEPLOY_ENV)
module.exports = () => {
  require('./common')(config, {node_env, deploy_env})
  require(`./${node_env}`)(config, {node_env, deploy_env})
  //
  console.log('config.toConfig()', config.toString()) //
  const wpc = config.toConfig()
  if (node_env === 'production') wpc.optimization.minimizer.push('...') //fix webpack-chain config.optimization.minimizer 不能加 '...' 的问题
  return wpc
}
