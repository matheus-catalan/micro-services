'use strict'

const Model = use('Model')

class Employee extends Model {
  static boot() {
    super.boot()
    this.addHook('beforeSave', async (employeeInstance) => {
      if (employeeInstance.dirty.gender) {
        employeeInstance.gender = employeeInstance.gender.toUpperCase()
      }
    })
  }

  phones() {
    return this.hasMany('App/Models/Phone')
  }

  employeesFile() {
    return this.hasMany('App/Models/EmployeesFile', 'id', 'employees_id')
  }

  contract() {
    return this.hasOne('App/Models/Contract', 'id', 'employees_id')
  }

  witness_1() {
    return this.hasOne('App/Models/Employee', 'id', 'contracts.witness_1')
  }
}

module.exports = Employee
