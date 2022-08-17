'use strict'

const { test, trait } = use('Test/Suite')('Permissions')

const Permission = use('App/Models/Permission')
const Factory = use('Factory')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Index]   it should return all permissions', async ({ client }) => {
  await Factory.model('App/Models/Permission').createMany(10)
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('permissions')
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  const permissions = await Permission.query().with('modules').fetch()

  response.assertJSON({ permissions: permissions.toJSON() })
})

test('[Store]   it should return the permission when created', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()
  const module = await Factory.model('App/Models/Module').create()

  const response = await client
    .post('permissions')
    .send({
      name: 'Delete user',
      slug: 'delete_user',
      description: 'Delete user',
      module_id: module.id,
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(201)

  const permission = await Permission.firstOrFail()
  await permission.load('modules')

  response.assertJSON({ permission: permission.toJSON() })
})

test('[Show]    it should return the permission when send permission id', async ({
  client,
}) => {
  const permission = await Factory.model('App/Models/Permission').create({})
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get(`permissions/${permission.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  const _permission = await Permission.findOrFail(permission.id)
  await _permission.load('modules')

  response.assertJSON({ permission: _permission.toJSON() })
})

test('[Update]  it should return permission when updated', async ({
  client,
}) => {
  const module = await Factory.model('App/Models/Module').create()
  const permission = await Factory.model('App/Models/Permission').create({
    module_id: module.id,
  })

  const user = await Factory.model('App/Models/User').create()

  const _permissionPayload = {
    name: 'Delete user',
    slug: 'delete_user',
    description: 'Delete user',
  }

  const response = await client
    .put(`permissions/${permission.id}`)
    .send(_permissionPayload)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(202)
  const _permission = await Permission.firstOrFail()
  await _permission.load('modules')

  response.assertJSON({ permission: _permission.toJSON() })
})

test('[Destroy] it should delete permission', async ({ assert, client }) => {
  const module = await Factory.model('App/Models/Module').create()

  const permission = await Factory.model('App/Models/Permission').create({
    module_id: module.id,
  })
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete(`permissions/${permission.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
  assert.equal(await Permission.getCount(), 0)
})
