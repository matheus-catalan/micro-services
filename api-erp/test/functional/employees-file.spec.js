'use strict'

const { test, trait } = use('Test/Suite')('Employees File')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

const EmployeesFile = use('App/Models/EmployeesFile')
const Factory = use('Factory')

test('[Index] it should return all employees files', async ({ client }) => {
  await Factory.model('App/Models/EmployeesFile').createMany(10)

  const response = await client.get('employees/file').send().end()

  response.assertStatus(200)

  const employee_files = await EmployeesFile.all()

  response.assertJSON({ employee_files: employee_files.toJSON() })
})

test('[Store] it should return the employee files when created', async ({
  client,
}) => {
  const employee = await Factory.model('App/Models/Employee').create()
  const { key: file_types_id } = await Factory.model(
    'App/Models/FileType'
  ).create()

  const response = await client
    .post('employees/file')
    .send({
      employees_id: employee.id,
      file_types_id,
      file_id: 1,
    })
    .end()

  response.assertStatus(201)

  const employee_file = await EmployeesFile.firstOrFail()
  await employee_file.load('file_type')

  response.assertJSON({ employee_file: employee_file.toJSON() })
})

test('[Show] it should return the employee file when send type employee id', async ({
  client,
}) => {
  const employee = await Factory.model('App/Models/Employee').create()
  const { key: file_types_id } = await Factory.model(
    'App/Models/FileType'
  ).create()

  const employee_file = await Factory.model('App/Models/EmployeesFile').create({
    employees_id: employee.id,
    file_types_id,
  })

  const response = await client
    .get(`/employees/file/${employee_file.id}`)
    .send()
    .end()

  response.assertStatus(200)

  const _employee_file = await EmployeesFile.findOrFail(employee_file.id)
  await _employee_file.load('file_type')

  response.assertJSON({ employee_file: _employee_file.toJSON() })
})

test('[Destroy] it should delete employee file', async ({ assert, client }) => {
  const employee = await Factory.model('App/Models/Employee').create()
  const { key: file_types_id } = await Factory.model(
    'App/Models/FileType'
  ).create()

  const employee_file = await Factory.model('App/Models/EmployeesFile').create({
    employees_id: employee.id,
    file_types_id,
  })

  const response = await client
    .delete(`employees/file/${employee_file.id}`)
    .send()
    .end()

  response.assertStatus(204)

  assert.equal(await EmployeesFile.getCount(), 0)
})
