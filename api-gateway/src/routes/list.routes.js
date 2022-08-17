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

modules.forEach(({ paths, name }, key) => {
  let routes = []

  paths.forEach((service) => {
    routes.push({
      index: service.path,
      method: service.method,
      host: `${modules[key].host}:${modules[key].port}`,
      permission_required: service.permission_required,
      module: name,
    })
  })

  console.table(routes)
})
