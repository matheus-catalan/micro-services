'use strict'

const { test, trait } = use('Test/Suite')('Module')

const Module = use('App/Models/Module')
const Factory = use('Factory')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Index] it should return all modules', async ({ client }) => {
  await Factory.model('App/Models/Module').createMany(10)
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('modules')
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  const modules = await Module.query().with('roles').with('permissions').fetch()

  response.assertJSON({ modules: modules.toJSON() })
})

test('[Store] it should return the module when created', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const role = await Factory.model('Role').create()

  const response = await client
    .post('modules')
    .send({
      name: 'test name',
      description: 'teste description',
      is_active: 1,
      roles: [role.id],
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(201)

  const module = await Module.firstOrFail()

  await module.loadMany(['roles', 'permissions'])

  response.assertJSON({ module: module.toJSON() })
})

test('[Show] it should return the module when send module id', async ({
  client,
}) => {
  const module = await Factory.model('App/Models/Module').create()
  const user = await Factory.model('App/Models/User').create()

  await Factory.model('App/Models/Permission').create({
    module_id: module.id,
  })

  const response = await client
    .get(`modules/${module.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  const _module = await Module.findOrFail(module.id)

  await _module.loadMany(['roles', 'permissions'])

  response.assertJSON({ module: _module.toJSON() })
})

test('[Update]  it should return module when updated', async ({ client }) => {
  const module = await Factory.model('App/Models/Module').create()
  const role = await Factory.model('Role').create()
  const user = await Factory.model('App/Models/User').create()

  const _modulePayload = {
    name: 'test updated name',
    description: 'test updated description',
    is_active: 0,
    roles: [role.id],
  }

  const response = await client
    .put(`modules/${module.id}`)
    .send(_modulePayload)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(202)
  const _module = await Module.firstOrFail()

  await _module.load('roles')

  response.assertJSON({ module: _module.toJSON() })
})

test('[Destroy] it should delete module', async ({ assert, client }) => {
  const module = await Factory.model('App/Models/Module').create()
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete(`modules/${module.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
  assert.equal(await Module.getCount(), 0)
})
