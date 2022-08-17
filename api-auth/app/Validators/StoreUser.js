class StoreUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
    }
  }

  get messages() {
    return {
      'username.unique': 'There is already a record with this username',
      'username.requerid': 'The username is required',
      'email.unique': 'There is already a record with this email',
      'email.requerid': 'The email is required',
    }
  }
}

module.exports = StoreUser
