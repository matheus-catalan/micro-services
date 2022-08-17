/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Env = use('Env')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    username: faker.name(),
    email: faker.email(),
    password: Env.get('PASS_DEFAULT'),
    is_active: 1,
    ...data,
  }
})

Factory.blueprint('App/Models/Module', (faker = {}) => {
  return {
    name: faker.first(),
    description: faker.sentence(),
    is_active: true,
  }
})

Factory.blueprint('App/Models/Permission', (faker, i, data = {}) => {
  return {
    slug: `${faker.first()}_${faker.first()}`,
    name: faker.first(),
    description: faker.sentence(),
    module_id: faker.integer({ min: 1, max: 100 }),
    ...data,
  }
})

Factory.blueprint('Role', (faker = {}) => {
  return {
    slug: `${faker.first()}_${faker.first()}`,
    name: faker.first(),
    description: faker.sentence(),
  }
})

Factory.blueprint('App/Models/Module', (faker = {}) => {
  return {
    name: `${faker.first()} ${faker.first()}`,
    description: faker.sentence(),
    is_active: 1,
  }
})
