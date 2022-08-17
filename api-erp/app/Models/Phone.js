'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Phone extends Model {
  employees() {
    return this.hasOne('App/Models/Employee')
  }
}

module.exports = Phone
