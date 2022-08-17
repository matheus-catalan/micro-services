'use strict'

const Model = use('Model')

class Contract extends Model {
  static boot() {
    super.boot()
    this.addHook('afterCreate', 'SignatureContractDefaultHook.create')
  }

  employee() {
    return this.belongsTo('App/Models/Employee', 'employees_id', 'id')
  }

  type_work() {
    return this.belongsTo('App/Models/TypeWork', 'type_works_id', 'id')
  }

  type_employees() {
    return this.belongsTo('App/Models/TypeEmployee', 'type_employees_id', 'id')
  }

  offices() {
    return this.belongsTo('App/Models/Office', 'offices_id', 'id')
  }

  employee_file() {
    return this.hasOne(
      'App/Models/EmployeesFile',
      'employees_id',
      'employees_id'
    )
  }
}

module.exports = Contract
