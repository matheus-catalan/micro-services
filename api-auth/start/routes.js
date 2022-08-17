/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/routes', () => {
  const list = Route.list().map((route) => {
    return route.toJSON()
  })

  return { service: 'AUTH', routes: list }
}).as('list.routes.auth')

Route.resource('sessions', 'SessionController')
  .only(['store', 'destroy'])
  .validator(new Map([[['session.store'], ['StoreSession']]]))

Route.post('validate', 'SessionController.validate')
  .validator('validateSession')
  .middleware('auth')

Route.resource('users', 'UserController')
  .apiOnly()
  .validator(
    new Map([
      [['users.store'], ['StoreUser']],
      [['users.update'], ['UpdateUser']],
    ])
  )
  .middleware('auth')

Route.post('forgot/password', 'UserController.forgotPassword')
Route.post('forgot/password/save', 'UserController.forgotPasswordSave')

Route.resource('permissions', 'PermissionController')
  .apiOnly()
  .validator(
    new Map([
      [['permissions.store'], ['StorePermission']],
      [['permissions.update'], ['UpdatePermission']],
    ])
  )
  .middleware('auth')

Route.resource('roles', 'RoleController')
  .apiOnly()
  .validator(
    new Map([
      [['roles.store'], ['StoreRole']],
      [['roles.update'], ['UpdateRole']],
    ])
  )
  .middleware('auth')

Route.resource('modules', 'ModuleController')
  .apiOnly()
  .validator(
    new Map([
      [['modules.store'], ['StoreModule']],
      [['modules.update'], ['UpdateModule']],
    ])
  )
  .middleware('auth')
