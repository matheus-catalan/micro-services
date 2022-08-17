'use strict'

class UpdatePermission {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      slug: 'unique:permissions',
      name: 'unique:permissions',
    }
  }

  get messages() {
    return {
      'slug.unique': 'There is already a record with this name',
      'name.unique': 'There is already a record with this name',
    }
  }
}

module.exports = UpdatePermission
