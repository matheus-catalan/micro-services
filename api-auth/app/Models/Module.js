'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Module extends Model {
  static get hidden() {
    return ['created_at', 'updated_at']
  }

  roles() {
    return this.belongsToMany('Role').pivotTable('modules_roles')
  }

  permissions() {
    return this.hasMany('App/Models/Permission')
  }
}

module.exports = Module
