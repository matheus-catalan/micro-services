const http = require('http')
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const routes = require('./routes/routes')
const authServiceProxy = httpProxy('api-auth:3333')

app.use(express.json())

const validateSession = require('./middleware/ValidateAuthenticity')

app.post('/sessions', (req, res, next) => {
  authServiceProxy(req, res, next)
})

routes.forEach((route) => {
  app.all(
    `${route.path}`,
    [validateSession],
    httpProxy(route.host, { timeout: 3000 })
  )
})

app.use(logger('dev'))
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

var server = http.createServer(app)
server.listen(3000)
