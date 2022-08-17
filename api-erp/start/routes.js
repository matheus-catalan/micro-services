'use strict'

const Route = use('Route')

Route.get('/routes', () => {
  const list = Route.list().map((route) => {
    return route.toJSON()
  })

  return { service: 'ERP', routes: list }
}).as('list.routes.erp')

Route.get('/type/work', 'TypeWorkController.index')

Route.resource('type/employees', 'TypeEmployeeController')
  .apiOnly()
  .validator(new Map([[['type/employees.store'], ['TypeEmployee']]]))

Route.resource('offices', 'OfficeController')
  .apiOnly()
  .validator(new Map([[['offices.store'], ['Office']]]))

Route.resource('employee', 'EmployeeController')
  .apiOnly()
  .except(['destroy'])
  .validator(new Map([[['employee.store'], ['Employee']]]))

Route.resource('phones', 'PhoneController')
  .apiOnly()
  .except(['index', 'show', 'store'])

Route.resource('contract', 'ContractController')
  .apiOnly()
  .except(['destroy'])
  .validator(new Map([[['contract.store'], ['Contract']]]))

Route.group(() => {
  Route.post('/send/:contract_id', 'ContractController.sendContract')
  Route.post('/signature/:user', 'ContractController.signature')
  Route.get('/status/:contract_id', 'ContractController.signatureStatus')
}).prefix('contract')

Route.resource('employees/file', 'EmployeeFileController').apiOnly()

Route.resource('erp/files', 'ErpFileController')
  .apiOnly()
  .except(['update', 'show'])

Route.resource('file/type', 'FileTypeController')

Route.get('/rabbit', 'RabbitmqpController.index')
Route.resource('file/type', 'FileTypeController').apiOnly()
