'use strict'

const Phone = use('App/Models/Phone')

class PhoneController {
  async update({ params, request, response }) {
    const _phonePayload = request.only(['phone'])

    try {
      const _phone = await Phone.findOrFail(params.id)

      _phone.merge(_phonePayload)
      await _phone.save()

      return response.status(202).send({ phone: _phone })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.menssage })
    }
  }

  async destroy({ params }) {
    const phone = await Phone.findOrFail(params.id)

    phone.delete()
  }
}

module.exports = PhoneController
