'use strict'

const { test, trait } = use('Test/Suite')('Employees')

const Employee = use('App/Models/Employee')
const Factory = use('Factory')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Index] it should return all employees', async ({ client }) => {
  await Factory.model('App/Models/Employee').create(15)

  const response = await client.get('employee').send().end()

  response.assertStatus(200)

  const employees = await Employee.query().with('phones').fetch()

  response.assertJSON({ employees: employees.toJSON() })
})

test('[Store] it should return the employee when created', async ({
  client,
}) => {
  const response = await client
    .post('employee')
    .send({
      name: 'teste',
      document: '00000000000',
      rg: '00000000000',
      email: 'teste@uaufi.com',
      secondary_email: 'teste@teste.com',
      gender: 'f',
      street: 'teste',
      number: '123',
      neighborhood: 'teste',
      city: 'teste',
      state: 'teste',
      country: 'teste',
      cep: '00000000',
      user_id: 1,
      phones: [
        {
          ddi: '55',
          ddd: '18',
          number: '112233445',
        },
      ],
      complement: '',
    })
    .end()

  response.assertStatus(201)

  const employee = await Employee.firstOrFail()

  await employee.load('phones')

  response.assertJSON({ employee: employee.toJSON() })
})

test('[Show] it should return the employee when send employee id', async ({
  client,
}) => {
  const employee = await Factory.model('App/Models/Employee').create()

  const response = await client.get(`employee/${employee.id}`).send().end()

  response.assertStatus(200)

  const _employee = await Employee.findOrFail(employee.id)

  await _employee.loadMany(['phones', 'employeesFile'])

  response.assertJSON({
    employee: _employee.toJSON(),
    contract: null,
  })
})

test('[Update]  it should return employee when updated', async ({ client }) => {
  const employee = await Factory.model('App/Models/Employee').create()

  const _employeePayload = {
    name: 'test user',
  }

  const response = await client
    .put(`employee/${employee.id}`)
    .send(_employeePayload)
    .end()

  response.assertStatus(202)

  const _employee = await Employee.firstOrFail()

  await _employee.load('phones')

  response.assertJSON({ employee: _employee.toJSON() })
})
