'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EmployeesFile extends Model {
  file_type() {
    return this.belongsTo('App/Models/FileType', 'file_type_id', 'id')
  }
}

module.exports = EmployeesFile
