'use strict'

class UpdateRole {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      slug: 'unique:roles',
      name: 'unique:roles',
    }
  }

  get messages() {
    return {
      'slug.unique': 'There is already a record with this name',
      'name.unique': 'There is already a record with this name',
    }
  }
}

module.exports = UpdateRole
