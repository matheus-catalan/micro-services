'use strict'

const Schema = use('Schema')

class CreateSignatureContractSchema extends Schema {
  up() {
    this.create('signature_contracts', (table) => {
      table.increments()
      table
        .integer('contract_id')
        .unsigned()
        .references('id')
        .inTable('contracts')
      table.integer('employee_signature')
      table.timestamp('employee_signature_date')
      table.integer('witness_1_signature')
      table.timestamp('witness_1_signature_date')
      table.integer('witness_2_signature')
      table.timestamp('witness_2_signature_date')
      table.integer('manager_signature')
      table.timestamp('manager_signature_date')
      table.timestamps()
    })
  }

  down() {
    this.drop('signature_contracts')
  }
}

module.exports = CreateSignatureContractSchema
