'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeesFilesSchema extends Schema {
  up() {
    this.create('employees_files', (table) => {
      table.increments()
      table
        .integer('employees_id')
        .unsigned()
        .references('id')
        .inTable('employees')
      table.integer('file_id').notNullable()
      table
        .integer('file_types_id')
        .unsigned()
        .references('id')
        .inTable('file_types')
        .after('file_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('employees_files')
  }
}

module.exports = EmployeesFilesSchema
