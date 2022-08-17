/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModulesRolesSchema extends Schema {
  up() {
    this.create('modules_roles', (table) => {
      table.increments()
      table.integer('module_id').unsigned().index()
      table
        .foreign('module_id')
        .references('id')
        .on('modules')
        .onDelete('cascade')
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('id').on('roles').onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('modules_roles')
  }
}

module.exports = ModulesRolesSchema
