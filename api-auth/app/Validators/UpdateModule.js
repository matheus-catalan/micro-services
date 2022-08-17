class UpdateModule {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'unique:modules',
    }
  }

  get messages() {
    return {
      'name.unique': 'There is already a record with this name',
    }
  }
}

module.exports = UpdateModule
