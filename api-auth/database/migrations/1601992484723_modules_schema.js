/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModulesSchema extends Schema {
  up() {
    this.create('modules', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.text('description').notNullable().unique()
      table.boolean('is_active').default(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('modules')
  }
}

module.exports = ModulesSchema
