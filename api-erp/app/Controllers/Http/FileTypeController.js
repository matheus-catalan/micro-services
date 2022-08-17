'use strict'

const FileType = use('App/Models/FileType')

class FileTypeController {
  async index({ response }) {
    const file_types = await FileType.all()

    response.status(200).send({ file_types })
  }

  async store({ request, response }) {
    const _fileTypePayload = request.only(['name', 'key', 'is_active'])

    try {
      const file_type = await FileType.create(_fileTypePayload)

      response.status(201).send({ file_type })
    } catch (error) {
      response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async update({ params, request, response }) {
    const _fileTypePayload = request.only(['name', 'key', 'active'])

    try {
      const file_type = await FileType.findOrFail(params.id)
      file_type.merge(_fileTypePayload)

      file_type.save()

      response.status(202).send({ file_type })
    } catch (error) {
      response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async destroy({ params, response }) {
    try {
      const file_type = await FileType.findOrFail(params.id)

      file_type.delete()

      response.status(204).send()
    } catch (error) {
      response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }
}

module.exports = FileTypeController
