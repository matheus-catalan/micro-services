class validateSession {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      permission_required: 'required',
    }
  }

  get messages() {
    return {
      'permission_required.required': 'The permission_required is required',
    }
  }
}

module.exports = validateSession
