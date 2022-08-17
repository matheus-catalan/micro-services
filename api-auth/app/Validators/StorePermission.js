class StorePermission {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|unique:permissions',
      slug: 'required|unique:permissions',
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

module.exports = StorePermission
