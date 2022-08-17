class StoreSession {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    }
  }

  get messages() {
    return {
      'email.requerid': 'The email is required',
      'password.requerid': 'The password is required',
    }
  }
}

module.exports = StoreSession
