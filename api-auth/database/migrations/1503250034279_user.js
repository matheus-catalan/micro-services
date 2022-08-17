/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      // table.integer('photo_id').unique()
      table.string('password').notNullable()
      table.string('token_forgot_password')
      table.timestamp('token_created_at')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
