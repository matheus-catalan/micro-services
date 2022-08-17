'use strict'

const Office = use('App/Models/Office')

class OfficeController {
  async index({ response }) {
    const offices = await Office.all()

    return response.status(200).send({ offices })
  }

  async store({ request, response }) {
    const { name } = request.all()

    try {
      const office = await Office.create({ name })

      return response.status(201).send({ office })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async show({ params, response }) {
    try {
      const office = await Office.findOrFail(params.id)

      return response.status(200).send({ office })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async update({ params, request, response }) {
    try {
      const office = await Office.findOrFail(params.id)
      const data = request.only(['name'])

      office.merge(data)

      await office.save()

      return response.status(202).send({ office })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async destroy({ params, response }) {
    try {
      const office = await Office.findOrFail(params.id)

      office.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }
}

module.exports = OfficeController
