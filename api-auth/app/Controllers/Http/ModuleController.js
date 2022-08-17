'use strict'

const Module = use('App/Models/Module')

class ModuleController {
  async index({ response }) {
    const modules = await Module.query()
      .with('roles')
      .with('permissions')
      .fetch()

    return response.status(200).send({ modules })
  }

  async store({ response, request }) {
    const { roles, ..._modulePayload } = request.only([
      'name',
      'description',
      'is_active',
      'roles',
    ])

    try {
      const module = await Module.create(_modulePayload)

      if (roles) {
        await module.roles().attach(roles)
      }

      await module.loadMany(['roles', 'permissions'])

      return response.status(201).send({ module })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async show({ response, params }) {
    try {
      const module = await Module.findOrFail(params.id)

      await module.load('roles')
      await module.load('permissions')

      return response.status(200).send({ module })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async update({ response, request, params }) {
    const { roles, ..._modulePayload } = request.only([
      'name',
      'description',
      'is_active',
      'roles',
    ])

    try {
      const module = await Module.findOrFail(params.id)

      module.merge(_modulePayload)
      module.save()

      if (roles) {
        await module.roles().sync(roles)
      }

      await module.load('roles')

      return response.status(202).send({ module })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async destroy({ response, params }) {
    try {
      const module = await Module.findOrFail(params.id)

      module.delete()

      return response.status(204).send()
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }
}

module.exports = ModuleController
