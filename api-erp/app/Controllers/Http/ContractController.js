'use strict'

const Contract = use('App/Models/Contract')
const Employee = use('App/Models/Employee')
const Office = use('App/Models/Office')
const Axios = use('axios')
const ejs = use('ejs')
const moment = use('moment')
const EmployeesFile = use('App/Models/EmployeesFile')
const FileType = use('App/Models/FileType')
const Mail = use('Mail')
const Env = use('Env')
const Encryption = use('Encryption')
const Database = use('Database')
const Helpers = use('Helpers')

const moth = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

class ContractController {
  async index({ response }) {
    const contracts = await Contract.query().with('employee').fetch()

    return response.status(200).send({ contracts })
  }

  async store({ request, response }) {
    const data = request.only([
      'witness_1',
      'witness_2',
      'salary',
      'description',
      'start_date',
      'finish_date',
      'employees_id',
      'type_employees_id',
      'send_date',
      'finish_date',
      'resignation_date',
      'offices_id',
      'type_works_id',
      'admission_date',
    ])

    const { file_type } = request.only(['file_type'])

    try {
      const contract = await Contract.create(data)

      const res = await this.generate_contract(contract.toObject())

      const file_type_id = await FileType.findByOrFail('key', file_type)

      await EmployeesFile.create({
        employees_id: data.employees_id,
        file_id: res.data.file_id,
        file_types_id: file_type_id.id,
      })

      await contract.load('employee')

      return response.status(201).send({
        contract,
        file_url: res.data.file_url,
      })
    } catch (error) {
      return response.status(error.status || 500).send({ error: error.message })
    }
  }

  async generate_contract(data) {
    if (Env.get('NODE_ENV') === 'testing') {
      return {
        data: {
          file_id: 1,
          file_url: null,
        },
      }
    }

    try {
      const employee = await Employee.findOrFail(data.employees_id)

      const office = await Office.findOrFail(data.offices_id)

      const address = `${employee.street}, ${employee.number} - ${
        employee.complement ? employee.complement : ''
      } - ${employee.neighborhood} - Cidade: ${employee.city} - CEP: ${
        employee.cep
      } - Estado de ${employee.state}`

      const date = `${moment().format('DD')} de ${
        moth[moment().format('MM')]
      } de ${moment().format('YYYY')}`

      const witness_1 = await Employee.findOrFail(data.witness_1)
      const witness_2 = await Employee.findOrFail(data.witness_2)

      const res = await ejs.renderFile(
        './resources/views/contracts/employees.ejs',
        {
          contract_id: data.id,
          contract_year: moment().format('YYYY'),
          employee_name: employee.name,
          office_name: office.name,
          document: employee.document,
          rg: employee.rg,
          address,
          date,
          witness_1_name: witness_1.name,
          witness_1_document: witness_1.document,
          witness_2_name: witness_2.name,
          witness_2_document: witness_2.document,
        }
      )

      const _response = await Axios.post(`${Env.get('API_FILES')}/v1/pdf`, {
        template: res,
        folder: 'contract',
        file_name: `contract_${data.id}`,
      })

      return _response
    } catch (error) {
      return error
    }
  }

  async show({ params, response }) {
    try {
      const contract = await Contract.findByOrFail('id', params.id)

      await contract.loadMany([
        'employee',
        'type_work',
        'type_employees',
        'offices',
      ])

      return response.status(200).send({ contract })
    } catch (error) {
      return response
        .status(error.status || 500)
        .send({ message: error.message })
    }
  }

  async update({ params, request, response }) {
    try {
      const contract = await Contract.findOrFail(params.id)

      const data = request.only([
        'witness_1',
        'witness_2',
        'salary',
        'description',
        'start_date',
        'finish_date',
        'employees_id',
        'type_employees_id',
        'offices_id',
        'type_works_id',
        'admission_date',
      ])

      const { file_type } = request.only(['file_type'])

      const res = await this.generate_contract({ ...data, id: params.id })

      contract.merge(data)

      await contract.save()

      contract.load('employee')

      const file_type_id = await FileType.findByOrFail('key', file_type)

      await EmployeesFile.create({
        employees_id: data.employees_id,
        file_id: res.data.file_id,
        file_types_id: file_type_id.id,
      })

      return response.status(202).send({
        contract,
        file_url: res.data.file_url,
      })
    } catch (error) {
      return response.status(error.status).send({ message: error.message })
    }
  }

  async sendContract({ params, response }) {
    const { contract_id } = params

    try {
      const contract = await Contract.findOrFail(contract_id)

      const employee = await Employee.query()
        .where('id', contract.employees_id)
        .first()

      const token = await Encryption.encrypt(contract.id)

      const witness_1 = await Employee.query()
        .where('id', contract.witness_1)
        .first()

      const witness_2 = await Employee.query()
        .where('id', contract.witness_2)
        .first()

      const { id: file_type_id } = await FileType.findByOrFail(
        'key',
        'CONTRACT'
      )

      const { file_id } = await EmployeesFile.query()
        .where('file_types_id', file_type_id)
        .where('employees_id', employee.id)
        .first()

      const _response =
        Env.get('NODE_ENV') !== 'testing'
          ? await Axios.get(`${Env.get('API_FILES')}/v1/files/${file_id}`)
          : {
              data: {
                file: {
                  url: '',
                },
              },
            }

      const data = [
        {
          mail: employee.email,
          name: employee.name,
          template: 'emails.signature_contract_employee',
          user: 'employee',
        },
        {
          mail: witness_1.email,
          name: witness_1.name,
          template: 'emails.signature_contract_witness',
          user: 'witness_1',
        },
        {
          mail: witness_2.email,
          name: witness_2.name,
          template: 'emails.signature_contract_witness',
          user: 'witness_2',
        },
        {
          mail: 'rodrigo.antunes@uaufi.com.br',
          name: 'Rodrigo Antunes',
          template: 'emails.signature_contract_manager',
          user: 'manager',
        },
      ]

      data.map(async (value) => {
        await Mail.send(
          [value.template],
          {
            name: value.name,
            token,
            contract_url: _response.data.file.url,
            user: value.user,
          },
          (message) => {
            message
              .to(Env.get('UAUFI_MAIL'))
              .from(value.mail, value.name)
              .subject(
                `Contrato de prestação de serviços autônomos - ${employee.name}`
              )
              .embed(Helpers.publicPath('logo.jpg'), 'logo')
              .embed(
                Helpers.publicPath('footer_mail_contract.png'),
                'footer_mail_contract'
              )
          }
        )
      })

      contract.send_date = moment().format('YYYY-MM-DD')

      await contract.save()

      return response.status(200).send()
    } catch (error) {
      console.log(error)
      return response.status(error.status || 500).send({ error: error.message })
    }
  }

  async signature({ request, params, response }) {
    const { token } = request.only(['token'])
    const contract_id = await Encryption.decrypt(token)

    try {
      const signature_contract = await Database.table('signature_contracts')
        .where('contract_id', contract_id)
        .where(`${params.user}_signature`, 1)
        .first()

      if (signature_contract) {
        return response.status(400).send({ message: 'contrato já assinado' })
      }

      await Database.table('signature_contracts')
        .where('contract_id', contract_id)
        .update(`${params.user}_signature`, 1)
        .update(`${params.user}_signature_date`, moment().format('YYYY-MM-DD'))

      return response.status(200).send()
    } catch (error) {
      return response.status(error || 500).send()
    }
  }

  async signatureStatus({ response, params }) {
    const { contract_id } = params

    try {
      const signature_contracts = await Database.table('signature_contracts')
        .where('contract_id', contract_id)
        .last()

      if (!signature_contracts) {
        return response.status(404).send({ message: 'Contrato não encontrado' })
      }

      return response.status(200).send({ signature_contracts })
    } catch (error) {
      return response.status(error || 500).send()
    }
  }
}

module.exports = ContractController
