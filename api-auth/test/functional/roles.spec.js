'use strict'

const { test, trait } = use('Test/Suite')('Roles')

const Role = use('Role')
const Factory = use('Factory')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Index]   it should return all roles', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const role = await Factory.model('Role').create()

  await role.permissions().attach([permission.id])

  const response = await client.get('roles').send().loginVia(user, 'jwt').end()

  response.assertStatus(200)

  const _role = await Role.query().with('permissions').fetch()

  response.assertJSON({ role: _role.toJSON() })
})

test('[Store]   it should return the role when created', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const response = await client
    .post('roles')
    .send({
      name: 'admin',
      slug: 'admin',
      description: 'admin',
      permission: [permission.id],
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(202)

  const _role = await Role.query().with('permissions').first()

  response.assertJSON({ role: _role.toJSON() })
})

test('[Show]    it should return the role when send role id', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const role = await Factory.model('Role').create()

  await role.permissions().attach([permission.id])

  const response = await client
    .get(`roles/${role.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  const _role = await Role.findOrFail(role.id)

  await _role.load('permissions')

  response.assertJSON({ role: _role.toJSON() })
})

test('[Update]  it should return role when updated', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  await role.permissions().attach([permission.id])

  const _rolePayload = {
    name: 'Delete user',
    slug: 'delete_user',
    description: 'Delete user',
    permissions: [],
  }

  const response = await client
    .put(`roles/${role.id}`)
    .send(_rolePayload)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(202)
  const _role = await Role.firstOrFail()

  await _role.load('permissions')

  response.assertJSON({ role: _role.toJSON() })
})

test('[Destroy] it should delete role', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  await role.permissions().attach([permission.id])

  const response = await client
    .delete(`roles/${role.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)
  assert.equal(await Role.getCount(), 0)
})
