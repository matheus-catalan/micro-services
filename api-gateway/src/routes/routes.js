const path = require('path')
const fs = require('fs')
const jsYaml = require('js-yaml')

const route = fs.readFileSync(
  path.resolve(process.cwd(), './src/routes/routes.yaml'),
  {
    encoding: 'utf8',
  }
)

const modules = jsYaml.load(route, { json: true })
let routes = []

modules.forEach(({ paths }, key) => {
  paths.forEach((service) => {
    routes.push({
      "path": service.path,
      "host": `${modules[key].host}:${modules[key].port}`,
      "method": service.method,
      "permission_required": service.permission_required
    })
  })
})

module.exports = routes
