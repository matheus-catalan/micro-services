'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeesSchema extends Schema {
  up() {
    this.create('employees', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('document').unique().notNullable()
      table.string('rg').unique().nullable()
      table.string('gender').notNullable()
      table.string('email').unique()
      table.string('secondary_email').unique().nullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('country').notNullable()
      table.string('cep').notNullable()
      table.string('complement')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('employees')
  }
}

module.exports = EmployeesSchema
