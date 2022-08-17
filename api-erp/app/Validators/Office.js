'use strict'

class Office {
  get rules() {
    return {
      name: 'required|unique:offices',
    }
  }
}

module.exports = Office
