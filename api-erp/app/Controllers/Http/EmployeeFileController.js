'use strict'

const EmployeesFile = use('App/Models/EmployeesFile')

class EmployeeFileController {
  async index({ response }) {
    const employee_files = await EmployeesFile.all()

    return response.status(200).send({ employee_files })
  }

  async store({ request, response }) {
    const _employ_file = request.only([
      'employees_id',
      'file_types_id',
      'file_id',
    ])

    try {
      const employee_file = await EmployeesFile.create(_employ_file)
      await employee_file.load('file_type')
      response.status(201).send({ employee_file })
    } catch (error) {
      console.log(error)
      response.status(error.status || 500).send({ error: error.message })
    }
  }

  async show({ response, params }) {
    const { id } = params

    try {
      const employee_file = await EmployeesFile.findOrFail(id)
      await employee_file.load('file_type')

      return response.status(200).send({ employee_file })
    } catch (error) {
      return response.status(error.status || 500).send({ error: error.message })
    }
  }

  async destroy({ params, response }) {
    const { id } = params

    try {
      const employeefile = await EmployeesFile.findOrFail(id)
      employeefile.delete()
      response.status(204).send()
    } catch (error) {
      response.status(error.status || 500).send({ error: error.message })
    }
  }
}

module.exports = EmployeeFileController
