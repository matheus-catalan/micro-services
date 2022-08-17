'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ErpFile = use('App/Models/ErpFile')
const QRCode = require('qrcode')

class ErpFileController {
  async index({ request, response }) {
    const page = request.input(['page', 1])

    const erp_files = await ErpFile.query().paginate(page)

    return response.status(200).send({ erp_files })
  }

  async store({ request, response }) {
    const _erpfilePayload = request.only([
      'name',
      'original_url',
      'shortened_url',
      'employees_id',
      'file_id',
    ])

    try {
      _erpfilePayload.qr_code = await QRCode.toDataURL(
        _erpfilePayload.shortened_url
      )

      const erp_file = await ErpFile.create(_erpfilePayload)

      return response.status(201).send({ erp_file })
    } catch (error) {
      return response.status(error.status || 500).send(error.message)
    }
  }

  async destroy({ params, response }) {
    const { id } = params
    try {
      const erp_file = await ErpFile.findOrFail(id)
      erp_file.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(error.status || 500).send({ error: error.message })
    }
  }
}

module.exports = ErpFileController
