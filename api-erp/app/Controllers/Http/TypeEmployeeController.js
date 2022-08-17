'use strict'

const TypeEmployee = use('App/Models/TypeEmployee')

class TypeEmployeeController {
  async index({ response }) {
    const types_employee = await TypeEmployee.all()

    return response.status(200).send({ types_employee })
  }

  async store({ request, response }) {
    const { name } = request.all()

    try {
      const type_employee = await TypeEmployee.create({ name })

      return response.status(201).send({ type_employee })
    } catch (error) {
      return response.status(error || 500).send({ message: error.message })
    }
  }

  async show({ params, response }) {
    try {
      const type_employee = await TypeEmployee.findOrFail(params.id)

      return response.status(200).send({ type_employee })
    } catch (error) {
      return response.send(error.status || 500).send({ message: error.message })
    }
  }

  async update({ params, request, response }) {
    try {
      const type_employee = await TypeEmployee.findOrFail(params.id)
      const data = request.only(['name'])

      type_employee.merge(data)

      await type_employee.save()

      return response.status(202).send({ type_employee })
    } catch (error) {
      return response.status(error.status).send({
        message: error.message,
      })
    }
  }

  async destroy({ params }) {
    const typeEmployee = await TypeEmployee.findOrFail(params.id)

    typeEmployee.delete()
  }
}

module.exports = TypeEmployeeController
