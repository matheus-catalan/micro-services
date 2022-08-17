'use strict'

const Role = use('Role')

class RoleController {
  async index({ response }) {
    const roles = await Role.query().with('permissions').fetch()

    return response.status(200).send({ role: roles })
  }

  async store({ response, request }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions',
    ])

    try {
      const role = await Role.create(data)

      if (permissions) {
        await role.permissions().attach(permissions)
      }

      await role.load('permissions')

      return response.status(202).send({ role })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async show({ response, params }) {
    try {
      const role = await Role.findOrFail(params.id)

      await role.load('permissions')

      return response.status(200).send({ role })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async update({ response, request, params }) {
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions',
    ])

    try {
      const role = await Role.findOrFail(params.id)

      role.merge(data)

      await role.save()

      if (permissions) {
        await role.permissions().sync(permissions)
      }

      await role.load('permissions')

      return response.status(202).send({ role })
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }

  async destroy({ response, params }) {
    try {
      const role = await Role.findOrFail(params.id)

      await role.delete()

      return response.status(204).send()
    } catch (error) {
      return response.status(error.status ? error.status : 500).send()
    }
  }
}

module.exports = RoleController
