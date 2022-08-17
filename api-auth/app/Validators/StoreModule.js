class StoreModule {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required|unique:modules',
    }
  }

  get messages() {
    return {
      'username.unique': 'There is already a record with this name',
      'username.requerid': 'The name is required',
    }
  }
}

module.exports = StoreModule
