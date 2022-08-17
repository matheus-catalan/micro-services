'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Contract', (faker, i, data = {}) => {
  return {
    witness_1: faker.integer({ min: 1, max: 100 }),
    witness_2: faker.integer({ min: 1, max: 100 }),
    salary: faker.floating({ fixed: 7, min: 0, max: 1000000 }),
    description: faker.sentence(),
    start_date: faker.date({ string: true, american: true }),
    finish_date: faker.date({ string: true, american: false }),
    employees_id: faker.integer({ min: 1, max: 100 }),
    type_employees_id: faker.integer({ min: 1, max: 100 }),
    offices_id: faker.integer({ min: 1, max: 100 }),
    type_works_id: faker.integer({ min: 1, max: 100 }),
    admission_date: faker.integer({ min: 1, max: 100 }),
    ...data,
  }
})

Factory.blueprint('App/Models/Employee', async (faker) => {
  return {
    name: faker.first(),
    document: faker.cpf(),
    rg: faker.cf(),
    email: faker.email({ domain: 'uaufi.com' }),
    secondary_email: faker.email(),
    gender: faker
      .gender({
        extraGenders: ['other'],
      })
      .substr(0, 1),
    street: faker.street(),
    number: faker.integer({ min: 1, max: 500 }),
    neighborhood: faker.province(),
    city: faker.city(),
    state: faker.state(),
    country: faker.country({ full: true }),
    cep: faker.integer({ min: 900000000, max: 999999999 }),
    complement: faker.sentence(),
    user_id: faker.integer({ min: 1, max: 100 }),
  }
})

Factory.blueprint('App/Models/Phone', async (faker) => {
  return {
    ddi: faker.integer({ min: 0, max: 99 }),
    ddd: faker.integer({ min: 0, max: 100 }),
    number: faker.integer({ min: 990000000, max: 999999999 }),
    is_whatsapp: faker.integer({ min: 0, max: 1 }),
    employee_id: faker.integer({ min: 1, max: 100 }),
  }
})

Factory.blueprint('App/Models/TypeEmployee', async (faker) => {
  return {
    name: `${faker.first()} ${faker.second()}`,
  }
})

Factory.blueprint('App/Models/EmployeesFile', async (faker) => {
  return {
    employees_id: faker.integer({ min: 1, max: 500 }),
    file_types_id: faker.integer({ min: 1, max: 500 }),
    file_id: faker.integer({ min: 1, max: 500 }),
  }
})

Factory.blueprint('App/Models/TypeWork', async (faker) => {
  return {
    name: faker.first(),
  }
})

Factory.blueprint('App/Models/Office', async (faker) => {
  return {
    name: faker.first(),
  }
})

Factory.blueprint('App/Models/FileType', async () => {
  return {
    name: 'CONTRACT',
    key: 'CONTRACT',
    is_active: true,
  }
})

Factory.blueprint('App/Models/ErpFile', async (faker) => {
  return {
    name: 'CONTRACT',
    original_url: faker.url(),
    shortened_url: faker.url(),
    qr_code: faker.first(),
    file_id: faker.integer({ min: 1, max: 500 }),
    employees_id: faker.integer({ min: 1, max: 500 }),
  }
})
