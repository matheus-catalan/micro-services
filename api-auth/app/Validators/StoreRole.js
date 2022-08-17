class StoreRole {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|unique:roles',
      slug: 'required|unique:roles',
    }
  }

  get messages() {
    return {
      'name.requerid': 'The name is required',
      'name.unique': 'There is already a record with this name',
      'slug.requerid': 'The slug is required',
      'slug.unique': 'There is already a record with this slug',
    }
  }
}

module.exports = StoreRole
