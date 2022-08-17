'use strict'

const { test, trait } = use('Test/Suite')('Phone')
const Phone = use('App/Models/Phone')
const Factory = use('Factory')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('[Update]  it should return phone when updated', async ({ client }) => {
  const employee = await Factory.model('App/Models/Employee').create()

  const phone = await Factory.model('App/Models/Phone').create({
    employee_id: employee.id,
  })

  const response = await client
    .put(`phones/${phone.id}`)
    .send({ number: '991234567' })
    .end()

  response.assertStatus(202)

  const _phone = await Phone.firstOrFail()

  response.assertJSON({ phone: _phone.toJSON() })
})

test('[Destroy] it should delete phone', async ({ assert, client }) => {
  const employee = await Factory.model('App/Models/Employee').create()

  const phone = await Factory.model('App/Models/Phone').create({
    employee_id: employee.id,
  })

  const response = await client.delete(`phones/${phone.id}`).send().end()

  response.assertStatus(204)

  assert.equal(await Phone.getCount(), 0)
})
