/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModulesUsersSchema extends Schema {
  up() {
    this.create('modules_users', (table) => {
      table.increments()
      table.integer('module_id').unsigned().index()
      table
        .foreign('module_id')
        .references('id')
        .on('modules')
        .onDelete('cascade')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('modules_users')
  }
}

module.exports = ModulesUsersSchema
