'use strict'

const { test, trait } = use('Test/Suite')('Office')

trait('DatabaseTransactions')
trait('Test/ApiClient')

const Office = use('App/Models/Office')
const Factory = use('Factory')

test('[Index] it should return all offices', async ({ client }) => {
  await Factory.model('App/Models/Office').createMany(10)

  const response = await client.get('offices').send().end()

  response.assertStatus(200)

  const offices = await Office.all()

  response.assertJSON({ offices: offices.toJSON() })
})

test('[Store] it should return the office when created', async ({ client }) => {
  await Office.truncate()
  const response = await client.post('offices').send({ name: 'teste' }).end()

  response.assertStatus(201)

  const office = await Office.firstOrFail()

  response.assertJSON({ office: office.toJSON() })
})

test('[Show] it should return the office when send office id', async ({
  client,
}) => {
  const office = await Factory.model('App/Models/Office').create()

  const response = await client.get(`offices/${office.id}`).send().end()

  response.assertStatus(200)

  const _office = await Office.findOrFail(office.id)

  response.assertJSON({ office: _office.toJSON() })
})

test('[Update]  it should return office when updated', async ({ client }) => {
  await Office.truncate()

  const office = await Factory.model('App/Models/Office').create()

  const _officePayload = {
    name: 'test office',
  }

  const response = await client
    .put(`offices/${office.id}`)
    .send(_officePayload)
    .end()

  response.assertStatus(202)

  const _office = await Office.firstOrFail()

  response.assertJSON({ office: _office.toJSON() })
})

test('[Destroy] it should delete office', async ({ assert, client }) => {
  await Office.truncate()

  const office = await Factory.model('App/Models/Office').create()

  const response = await client.delete(`offices/${office.id}`).send().end()

  response.assertStatus(204)

  assert.equal(await Office.getCount(), 0)
})
