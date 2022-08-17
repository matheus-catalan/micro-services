'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractsSchema extends Schema {
  up() {
    this.create('contracts', (table) => {
      table.increments()
      table.decimal('salary').notNullable()
      table.string('description').notNullable()
      table.integer('witness_1').notNullable()
      table.integer('witness_2').notNullable()
      table.timestamp('send_date')
      table.timestamp('start_date').notNullable()
      table.timestamp('finish_date').nullable()
      table
        .integer('employees_id')
        .unsigned()
        .references('id')
        .inTable('employees')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('type_employees_id')
        .unsigned()
        .references('id')
        .inTable('type_employees')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('offices_id')
        .unsigned()
        .references('id')
        .inTable('offices')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('type_works_id')
        .unsigned()
        .references('id')
        .inTable('type_works')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamp('admission_date').notNullable()
      table.timestamp('resignation_date')
      table.timestamps()
    })
  }

  down() {
    this.drop('contracts')
  }
}

module.exports = ContractsSchema
