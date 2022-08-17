'use strict'

const { test, trait } = use('Test/Suite')('Contracts')

const Contract = use('App/Models/Contract')
const Factory = use('Factory')
const Encryption = use('Encryption')
const Database = use('Database')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('[Index] it should return all contracts', async ({ client }) => {
  await Factory.model('App/Models/Contract').createMany(15)

  const response = await client.get('contract').send().end()

  response.assertStatus(200)

  const contracts = await Contract.query().with('employee').fetch()

  response.assertJSON({ contracts: contracts.toJSON() })
})

test('[Store] it should return the contract when created', async ({
  client,
}) => {
  const employee = await Factory.model('App/Models/Employee').create()
  const witness_1 = await Factory.model('App/Models/Employee').create()
  const witness_2 = await Factory.model('App/Models/Employee').create()
  const { id: type_employees_id } = await Factory.model(
    'App/Models/TypeEmployee'
  ).create()
  const { id: type_works_id } = await Factory.model(
    'App/Models/TypeWork'
  ).create()

  const { id: offices_id } = await Factory.model('App/Models/Office').create()

  const { key: file_type } = await Factory.model('App/Models/FileType').create()

  const response = await client
    .post('contract')
    .send({
      witness_1: witness_1.id,
      witness_2: witness_2.id,
      salary: '2000,00',
      description: 'teste',
      start_date: new Date(),
      employees_id: employee.id,
      type_employees_id,
      send_date: null,
      finish_date: null,
      resignation_date: null,
      offices_id,
      type_works_id,
      file_type,
      admission_date: new Date(),
    })
    .end()

  response.assertStatus(201)

  const contract = await Contract.firstOrFail()

  await contract.load('employee')

  response.assertJSON({ contract: contract.toJSON(), file_url: null })
})

test('[Show] it should return the contract when send contract id', async ({
  client,
}) => {
  const { id: employees_id } = await Factory.model(
    'App/Models/Employee'
  ).create()
  const { id: witness_1 } = await Factory.model('App/Models/Employee').create()
  const { id: witness_2 } = await Factory.model('App/Models/Employee').create()
  const { id: type_employees_id } = await Factory.model(
    'App/Models/TypeEmployee'
  ).create()
  const { id: type_works_id } = await Factory.model(
    'App/Models/TypeWork'
  ).create()

  const { id: offices_id } = await Factory.model('App/Models/Office').create()

  const contract = await Factory.model('App/Models/Contract').create({
    employees_id,
    witness_1,
    witness_2,
    type_employees_id,
    type_works_id,
    offices_id,
  })

  const response = await client.get(`contract/${contract.id}`).send().end()

  response.assertStatus(200)

  const _contract = await Contract.findOrFail(contract.id)

  await _contract.loadMany([
    'employee',
    'type_work',
    'type_employees',
    'offices',
  ])

  response.assertJSON({ contract: _contract.toJSON() })
})

test('[Update] it should return contract when updated', async ({ client }) => {
  const { key } = await Factory.model('App/Models/FileType').create()
  const contract = await Factory.model('App/Models/Contract').create()

  const _contractPayload = {
    salary: 1600.0,
    description: 'teste',
    file_type: key,
  }

  const response = await client
    .put(`contract/${contract.id}`)
    .send(_contractPayload)
    .end()

  response.assertStatus(202)
  const _contract = await Contract.firstOrFail()

  await _contract.load('employee')

  response.assertJSON({ contract: _contract.toJSON(), file_url: null })
})

test('[sendContract] it should send mail', async ({ client }) => {
  const { id: employees_id } = await Factory.model(
    'App/Models/Employee'
  ).create()
  const { id: witness_1 } = await Factory.model('App/Models/Employee').create()
  const { id: witness_2 } = await Factory.model('App/Models/Employee').create()
  const { id: type_employees_id } = await Factory.model(
    'App/Models/TypeEmployee'
  ).create()
  const { id: type_works_id } = await Factory.model(
    'App/Models/TypeWork'
  ).create()

  const { id: file_types_id } = await Factory.model(
    'App/Models/FileType'
  ).create()

  const { id: offices_id } = await Factory.model('App/Models/Office').create()

  const contract = await Factory.model('App/Models/Contract').create({
    employees_id,
    witness_1,
    witness_2,
    type_employees_id,
    type_works_id,
    offices_id,
  })

  await Factory.model('App/Models/EmployeesFile').create({
    employees_id,
    file_types_id,
    file_id: 10,
  })

  const response = await client
    .post(`contract/send/${contract.id}`)
    .send()
    .end()

  response.assertStatus(200)
})

test('[signatureContract] it should sign the contract', async ({
  client,
  assert,
}) => {
  const { id: employees_id } = await Factory.model(
    'App/Models/Employee'
  ).create()
  const { id: witness_1 } = await Factory.model('App/Models/Employee').create()
  const { id: witness_2 } = await Factory.model('App/Models/Employee').create()
  const { id: type_employees_id } = await Factory.model(
    'App/Models/TypeEmployee'
  ).create()
  const { id: type_works_id } = await Factory.model(
    'App/Models/TypeWork'
  ).create()

  const { id: file_types_id } = await Factory.model(
    'App/Models/FileType'
  ).create()

  const { id: offices_id } = await Factory.model('App/Models/Office').create()

  const contract = await Factory.model('App/Models/Contract').create({
    employees_id,
    witness_1,
    witness_2,
    type_employees_id,
    type_works_id,
    offices_id,
  })

  await Factory.model('App/Models/EmployeesFile').create({
    employees_id,
    file_types_id,
    file_id: 10,
  })

  const token = await Encryption.encrypt(contract.id)

  await client.post(`contract/signature/employee`).send({ token }).end()
  await client.post(`contract/signature/witness_1`).send({ token }).end()
  await client.post(`contract/signature/witness_2`).send({ token }).end()
  await client.post(`contract/signature/manager`).send({ token }).end()

  const {
    witness_1_signature,
    employee_signature,
    witness_2_signature,
    manager_signature,
  } = await Database.table('signature_contracts').first()

  assert.equal(employee_signature, 1)
  assert.equal(witness_1_signature, 1)
  assert.equal(witness_2_signature, 1)
  assert.equal(manager_signature, 1)
})

test('[signatureStatus] it should return the status of the contract signature', async ({
  client,
}) => {
  const { id: employees_id } = await Factory.model(
    'App/Models/Employee'
  ).create()
  const { id: witness_1 } = await Factory.model('App/Models/Employee').create()
  const { id: witness_2 } = await Factory.model('App/Models/Employee').create()
  const { id: type_employees_id } = await Factory.model(
    'App/Models/TypeEmployee'
  ).create()
  const { id: type_works_id } = await Factory.model(
    'App/Models/TypeWork'
  ).create()

  const { id: file_types_id } = await Factory.model(
    'App/Models/FileType'
  ).create()

  const { id: offices_id } = await Factory.model('App/Models/Office').create()

  const contract = await Factory.model('App/Models/Contract').create({
    employees_id,
    witness_1,
    witness_2,
    type_employees_id,
    type_works_id,
    offices_id,
  })

  await Factory.model('App/Models/EmployeesFile').create({
    employees_id,
    file_types_id,
    file_id: 10,
  })

  await Database.table('signature_contracts').update({
    witness_1_signature: 1,
    employee_signature: 1,
    witness_2_signature: 1,
    manager_signature: 1,
  })

  const response = await client
    .get(`contract/status/${contract.id}`)
    .send()
    .end()

  response.assertStatus(200)

  const signature_contracts = await Database.table(
    'signature_contracts'
  ).first()

  response.assertJSON({ signature_contracts })
})
