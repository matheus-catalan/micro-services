'use strict'

const Factory = use('Factory')
const TypeWork = use('App/Models/TypeWork')

class TypeWorkSeeder {
  async run() {
    await TypeWork.createMany([{ name: 'CLT' }, { name: 'Contrato Autônomo' }])
  }
}

module.exports = TypeWorkSeeder
