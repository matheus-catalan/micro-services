'use strict'

class TypeEmployee {
  get rules() {
    return {
      name: 'required|unique:type_employees',
    }
  }
}

module.exports = TypeEmployee
