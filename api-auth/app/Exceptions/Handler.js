'use strict'

const Raven = require('raven')

const Config = use('Config')
const Youch = use('Youch')
const Env = use('Env')
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }
    response.status(error.status ? error.status : 500)

    if (`${Env.get('NODE_ENV')}` === 'production') return response.send()

    const youch = new Youch(error, request.request)
    const errorJSON = await youch.toJSON()
    return response.send(errorJSON)
  }

  async report(error) {
    if (`${Env.get('NODE_ENV')}` === 'production') {
      Raven.config(Config.get('services.sentry.dsn'))
      Raven.captureException(error)
    } else {
      /* eslint-disable no-console */
      console.log(error)
      /* eslint-enable no-console */
    }
  }
}

module.exports = ExceptionHandler
