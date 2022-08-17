'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
  static get hidden() {
    return ['created_at', 'updated_at']
  }

  modules() {
    return this.hasOne('App/Models/Module', 'module_id', 'id')
  }
}

module.exports = Permission
