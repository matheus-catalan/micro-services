'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const FileType = use('App/Models/FileType')

class FiletypeSeeder {
  async run() {
    await FileType.createMany([
      { name: 'IMAGEM DE PERFIL', key: 'PROFILE_IMAGE', is_active: true },
      { name: 'DOCUMENTO ERP', key: 'DOCUMENT_ERP', is_active: true },
      { name: 'CPF', key: 'CPF', is_active: true },
      { name: 'CNPJ', key: 'CNPJ', is_active: true },
      { name: 'RG', key: 'RG', is_active: true },
      {
        name: 'COMPROVANTE DE RESIDENCIA',
        key: 'PROOFADDRESS',
        is_active: true,
      },
      { name: 'CONTRACT', key: 'CONTRACT', is_active: true },
    ])
  }
}

module.exports = FiletypeSeeder
