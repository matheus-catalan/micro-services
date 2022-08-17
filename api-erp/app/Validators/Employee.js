'use strict'

class Employee {
  get rules() {
    return {
      name: 'required',
      document: 'required|unique:employees',
      rg: 'unique:employees',
      email: 'required|unique:employees',
      secondary_email: 'required|unique:employees',
      gender: 'required',
      street: 'required',
      number: 'required',
      neighborhood: 'required',
      city: 'required',
      state: 'required',
      country: 'required',
      cep: 'required',
      phones: 'required',
    }
  }
}

module.exports = Employee
