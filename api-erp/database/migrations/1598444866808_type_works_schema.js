'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeWorksSchema extends Schema {
  up() {
    this.create('type_works', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('type_works')
  }
}

module.exports = TypeWorksSchema
