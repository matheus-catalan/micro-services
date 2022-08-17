'use strict'

const Permission = use('App/Models/Permission')

class PermissionController {
  async index({ response }) {
    const permissions = await Permission.query().with('modules').fetch()

    return response.send({ permissions })
  }

  async store({ response, request }) {
    const _permissionsPayload = request.only([
      'slug',
      'name',
      'description',
      'module_id',
    ])

    try {
      const permission = await Permission.create(_permissionsPayload)
      await permission.load('modules')

      return response.status(201).send({ permission })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async show({ response, params }) {
    try {
      const permission = await Permission.findOrFail(params.id)
      await permission.load('modules')

      return response.status(200).send({ permission })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async update({ response, request, params }) {
    const data = request.only(['name', 'slug', 'description', 'module_id'])

    try {
      const permission = await Permission.findOrFail(params.id)

      permission.merge(data)
      await permission.save()

      await permission.load('modules')

      return response.status(202).send({ permission })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async destroy({ response, params }) {
    try {
      const permission = await Permission.findOrFail(params.id)
      permission.delete()

      return response.status(204).send()
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }
}

module.exports = PermissionController
