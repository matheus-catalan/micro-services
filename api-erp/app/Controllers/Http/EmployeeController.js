'use strict'

const Employee = use('App/Models/Employee')
const Contract = use('App/Models/Contract')
const EmployeesFile = use('App/Models/EmployeesFile')

class EmployeeController {
  async index({ response }) {
    const employees = await Employee.query().with('phones').fetch()

    return response.send({ employees })
  }

  async store({ request, response }) {
    try {
      const { phones, ...data } = request.only([
        'name',
        'document',
        'rg',
        'email',
        'secondary_email',
        'gender',
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'country',
        'cep',
        'complement',
        'user_id',
        'phones',
      ])

      const employee = await Employee.create(data)

      if (phones) {
        await employee.phones().createMany(phones)
      }

      await employee.load('phones')

      return response.status(201).send({ employee })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async show({ params, response }) {
    const { id } = params

    try {
      const employee = await Employee.query()
        .with('phones')
        .with('employeesFile')
        .where('employees.id', id)
        .first()

      const contract = await Contract.query()
        .with('type_work')
        .with('type_employees')
        .with('offices')
        .where('employees_id', id)
        .first()

      if (contract) {
        contract.employee_file = await EmployeesFile.query()
          .join('file_types', 'file_types.id', 'employees_files.file_types_id')
          .where('file_types.key', 'CONTRACT')
          .where('employees_files.employees_id', employee.id)
          .orderBy('employees_files.id')
          .limit(1)
          .first()

        contract.witness_1 = await Employee.query()
          .select('id', 'name')
          .where('id', contract.witness_1)
          .first()

        contract.witness_2 = await Employee.query()
          .select('id', 'name')
          .where('id', contract.witness_2)
          .first()
      }

      return response.send({ employee, contract })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async update({ params, request, response }) {
    try {
      const employee = await Employee.findOrFail(params.id)

      const data = request.only([
        'name',
        'document',
        'rg',
        'email',
        'secondary_email',
        'gender',
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'country',
        'cep',
        'complement',
        'user_id',
      ])

      const { phones } = request.only(['phones'])

      if (data) {
        employee.merge(data)
        await employee.save()
      }

      if (phones) {
        await employee.phones().delete()
        await employee.phones().createMany(phones)
      }

      await employee.load('phones')

      return response.status(202).send({ employee })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }
}

module.exports = EmployeeController
