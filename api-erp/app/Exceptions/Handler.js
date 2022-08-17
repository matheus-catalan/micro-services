'use strict'

const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'production') {
      return response.status(error.status)
    }

    const youch = new Youch(error, request.request)
    const errorJSON = await youch.toJSON()

    return response.status(error.status).send(errorJSON)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error) {
    if (Env.get('NODE_ENV') !== 'testing') {
      console.log(error)
    }
  }
}

module.exports = ExceptionHandler
