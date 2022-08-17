'use strict'

const { test, trait } = use('Test/Suite')('Sessions')

const Factory = use('Factory')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Store]   it should return the permission when created', async ({
  assert,
  client,
}) => {
  const sessionPayload = {
    email: 'matheuscatalan@outlook.com',
    password: '123456',
  }

  const user = await Factory.model('App/Models/User').create(sessionPayload)

  const role = await Factory.model('Role').create()
  await user.roles().attach([role.id])

  const module = await Factory.model('App/Models/Module').create()

  await user.modules().attach([module.id])

  const permission = await Factory.model('App/Models/Permission').create({
    module_id: module.id,
  })

  await user.permissions().attach([permission.id])

  sessionPayload.module_required = module.name

  const response = await client.post('sessions').send(sessionPayload).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})

test('[Validate] it should return true when jwt is valid', async ({
  client,
}) => {
  const sessionPayload = {
    email: 'matheuscatalan@outlook.com',
    password: '123456',
  }

  const user = await Factory.model('App/Models/User').create(sessionPayload)

  const role = await Factory.model('Role').create()
  await user.roles().attach([role.id])

  const permission = await Factory.model('App/Models/Permission').create()
  await user.permissions().attach([permission.id])

  const module = await Factory.model('App/Models/Module').create()
  await user.modules().attach([module.id])

  const response = await client
    .post('validate')
    .loginVia(user, 'jwt')
    .send({ permission_required: permission.slug })
    .end()

  response.assertStatus(200)
})

test('[Validate] it should return false when jwt is invalid', async ({
  client,
}) => {
  const sessionPayload = {
    email: 'matheuscatalan@outlook.com',
    password: '123456',
  }

  const user = await Factory.model('App/Models/User').create(sessionPayload)

  const role = await Factory.model('Role').create()
  await user.roles().attach([role.id])

  const permission = await Factory.model('App/Models/Permission').create()
  await user.permissions().attach([permission.id])

  const module = await Factory.model('App/Models/Module').create()
  await user.modules().attach([module.id])

  const response = await client
    .post('validate')
    .loginVia(user, 'jwt')
    .send({ permission_required: permission.name })
    .end()

  response.assertStatus(401)
})
