'use strict'

const TypeWork = use('App/Models/TypeWork')

class TypeWorkController {
  async index({ response }) {
    const type_works = await TypeWork.all()

    return response.status(200).send({ type_works })
  }
}

module.exports = TypeWorkController
