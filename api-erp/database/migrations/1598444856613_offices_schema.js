'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfficesSchema extends Schema {
  up() {
    this.create('offices', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('offices')
  }
}

module.exports = OfficesSchema
