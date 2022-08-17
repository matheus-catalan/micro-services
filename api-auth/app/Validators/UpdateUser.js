class UpdateUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'unique:users',
      email: 'email|unique:users',
    }
  }

  get messages() {
    return {
      'username.unique': 'There is already a record with this username',
      'email.unique': 'There is already a record with this email',
    }
  }
}

module.exports = UpdateUser
