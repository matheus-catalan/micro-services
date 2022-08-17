'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ErpFileSchema extends Schema {
  up() {
    this.create('erp_files', (table) => {
      table.increments()
      table.string('name')
      table.string('original_url')
      table.string('shortened_url')
      table.text('qr_code')
      table.string('file_id')
      table
        .integer('employees_id')
        .unsigned()
        .references('id')
        .inTable('employees')
      table.timestamps()
    })
  }

  down() {
    this.drop('erp_files')
  }
}

module.exports = ErpFileSchema
