const http = require('http')
const axios = require('axios')
const routes = require('../routes/routes')

const validateSession = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'E_INVALID_JWT_TOKEN: jwt must be provided',
      name: 'InvalidJwtToken',
    })
  }

  const headers = {
    headers: { Authorization: req.headers.authorization },
  }

  const route = routes.filter((r) => {
    return r.path === req.route.path && r.method === req.method
  })

  

  const body = {
    permission_required: route[0].permission_required,
  }

  axios
    .post('http://api-auth:3333/validate', body, headers, { timeout: 1000 })
    .then(function (response) {
      return response.status === 200 ? next() : res.status(500).send()
    })
    .catch(function (error) {
      const _status = 401
        // typeof error.response != undefined ? error.response.status : 401

      return res.status(_status).send({ error: error.response.statusText })
    })
}

module.exports = validateSession
