'use strict'

const { test, trait } = use('Test/Suite')('Users')

const User = use('App/Models/User')
const Factory = use('Factory')
const Mail = use('Mail')
const crypto = use('crypto')
const Hash = use('Hash')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Index]   it should return all users', async ({ client }) => {
  const _user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const module = await Factory.model('App/Models/Module').create()

  await _user.permissions().attach([role.id])

  await _user.roles().attach([permission.id])

  await _user.modules().attach([module.id])

  const user = await Factory.model('App/Models/User').create()

  const response = await client.get('users').send().loginVia(user, 'jwt').end()

  response.assertStatus(200)

  const users = await User.query()
    .with('roles')
    .with('permissions')
    .with('modules')
    .fetch()

  response.assertJSON({ users: users.toJSON() })
})

test('[Store]   it should return the user when created', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const role = await Factory.model('Role').create()

  const module = await Factory.model('App/Models/Module').create()

  const response = await client
    .post('users')
    .send({
      username: 'teste',
      email: 'teste@teste.com',
      is_active: 1,
      permissions: [permission.id],
      roles: [role.id],
      modules: [module.id],
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(201)

  const _user = await User.last()

  await _user.loadMany(['roles', 'permissions', 'modules'])

  response.assertJSON({ user: _user.toJSON() })
})

test('[Show]    it should return the user when send user id', async ({
  client,
}) => {
  const _user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const module = await Factory.model('App/Models/Module').create()

  await _user.permissions().attach([permission.id])

  await _user.roles().attach([role.id])

  await _user.modules().attach([module.id])

  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get(`users/${_user.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)

  const data = await User.findOrFail(_user.id)

  await data.loadMany(['permissions', 'roles', 'modules'])

  response.assertJSON({ user: data.toJSON() })
})

test('[Update]  it should return user when updated', async ({ client }) => {
  const _user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const module = await Factory.model('App/Models/Module').create()

  await _user.permissions().attach([permission.id])

  await _user.roles().attach([role.id])

  await _user.modules().attach([module.id])

  const user = await Factory.model('App/Models/User').create()

  const _userPayload = {
    name: 'test user',
  }

  const response = await client
    .put(`users/${_user.id}`)
    .send(_userPayload)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(202)

  const data = await User.findOrFail(_user.id)

  await data.loadMany(['permissions', 'roles', 'modules'])

  response.assertJSON({ user: data.toJSON() })
})

test('[Destroy] it should delete user', async ({ assert, client }) => {
  const _user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const module = await Factory.model('App/Models/Module').create()

  await _user.permissions().attach([permission.id])

  await _user.roles().attach([role.id])

  await _user.modules().attach([module.id])

  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .delete(`users/${_user.id}`)
    .send()
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(204)

  assert.equal(await User.find(_user.id), null)
})

test('[Forgot Password] it should send email with token for forgot password', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const module = await Factory.model('App/Models/Module').create()

  await user.permissions().attach([permission.id])

  await user.roles().attach([role.id])

  await user.modules().attach([module.id])

  Mail.fake()

  const response = await client
    .post('/forgot/password')
    .send({ email: user.email })
    .end()

  const recentEmail = await Mail.pullRecent()

  assert.equal(recentEmail.envelope.from, `${user.email}`)

  Mail.restore()

  response.assertStatus(200)
})

test('[Forgot Password save] it should updated password on user', async ({
  assert,
  client,
}) => {
  const _user = await User.first()
  if (_user !== null) _user.delete()

  const user = await Factory.model('App/Models/User').create()

  const role = await Factory.model('Role').create()

  const permission = await Factory.model('App/Models/Permission').create()

  const module = await Factory.model('App/Models/Module').create()

  await user.permissions().attach([permission.id])

  await user.roles().attach([role.id])

  await user.modules().attach([module.id])

  const token = await crypto.randomBytes(10).toString('hex')

  user.token_forgot_password = token
  user.token_created_at = new Date()
  await user.save()

  const passwords = '12345'

  const response = await client
    .post('/forgot/password/save')
    .send({
      token,
      password: passwords,
      confirmed_password: passwords,
    })
    .end()

  response.assertStatus(200)

  const { password } = await User.query().select('password').first()

  await assert.isTrue(await Hash.verify(passwords, `${password}`))
})
