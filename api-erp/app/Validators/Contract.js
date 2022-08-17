'use strict'

class Contract {
  get rules() {
    return {
      witness_1: 'required',
      witness_2: 'required',
      salary: 'required',
      description: 'required',
      start_date: 'required',
      employees_id: 'required',
      type_employees_id: 'required',
      offices_id: 'required',
      type_works_id: 'required',
      admission_date: 'required',
    }
  }
}

module.exports = Contract
