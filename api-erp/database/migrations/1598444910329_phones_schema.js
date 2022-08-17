'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhonesSchema extends Schema {
  up() {
    this.create('phones', (table) => {
      table.increments()
      table.string('ddi').notNullable()
      table.string('ddd').notNullable()
      table.string('number').notNullable().unique()
      table.boolean('is_whatsapp').notNullable().defaultTo(true)
      table
        .integer('employee_id')
        .unsigned()
        .references('id')
        .inTable('employees')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('phones')
  }
}

module.exports = PhonesSchema
