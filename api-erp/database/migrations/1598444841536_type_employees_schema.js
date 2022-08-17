'use strict'

const Schema = use('Schema')

class TypeEmployeesSchema extends Schema {
  up() {
    this.create('type_employees', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('type_employees')
  }
}

module.exports = TypeEmployeesSchema
