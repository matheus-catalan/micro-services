'use strict'

const { test, trait } = use('Test/Suite')('Type Employee')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

const TypeEmployee = use('App/Models/TypeEmployee')
const Factory = use('Factory')

test('[Index] it should return all type employees', async ({ client }) => {
  await TypeEmployee.truncate()
  await Factory.model('App/Models/TypeEmployee').createMany(10)

  const response = await client.get('/type/employees').send().end()

  response.assertStatus(200)

  const types_employee = await TypeEmployee.all()

  response.assertJSON({ types_employee: types_employee.toJSON() })
})

test('[Store] it should return the type employee when created', async ({
  client,
}) => {
  const response = await client
    .post('/type/employees')
    .send({
      name: 'test name',
    })
    .end()

  response.assertStatus(201)

  const type_employee = await TypeEmployee.firstOrFail()

  response.assertJSON({ type_employee: type_employee.toJSON() })
})

test('[Show] it should return the type employee when send type employee id', async ({
  client,
}) => {
  const type_employee = await Factory.model('App/Models/TypeEmployee').create()

  const response = await client
    .get(`/type/employees/${type_employee.id}`)
    .send()
    .end()

  response.assertStatus(200)

  const _type_employee = await TypeEmployee.findOrFail(type_employee.id)

  response.assertJSON({ type_employee: _type_employee.toJSON() })
})

test('[Update] it should return type employee when updated', async ({
  client,
}) => {
  const type_employee = await Factory.model('App/Models/TypeEmployee').create()

  const response = await client
    .put(`type/employees/${type_employee.id}`)
    .send({
      name: 'teste updated',
    })
    .end()

  response.assertStatus(202)

  const _type_employee = await TypeEmployee.findOrFail(type_employee.id)

  response.assertJSON({ type_employee: _type_employee.toJSON() })
})

test('[Destroy] it should delete type employee', async ({ assert, client }) => {
  const type_employee = await Factory.model('App/Models/TypeEmployee').create()

  const response = await client
    .delete(`type/employees/${type_employee.id}`)
    .send()
    .end()

  response.assertStatus(204)
  assert.equal(await TypeEmployee.getCount(), 0)
})
