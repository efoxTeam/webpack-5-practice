import './styles/index.scss'
import printMe from './print.js'
console.log('DEPLOY_ENV:', process.env.DEPLOY_ENV)
function component() {
  const element = document.getElementById('root')
  const btn = document.createElement('button')
  const h1 = document.createElement('h1')
  const p = document.createElement('p')
  h1.innerHTML = 'Webpack 5 Practice!!'
  btn.innerHTML = 'Click me and check the console!! '
  p.innerHTML = 'Waitting Click'
  btn.onclick = printMe(p)
  element.appendChild(h1)
  element.appendChild(btn)
  element.appendChild(p)

  return element
}
let element = component()
document.body.appendChild(element)

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element)
    element = component() // Re-render the "component" to update the click handler
    document.body.appendChild(element)
  })
}
