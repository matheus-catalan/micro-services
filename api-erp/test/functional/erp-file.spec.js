'use strict'

const { test, trait } = use('Test/Suite')('Erp File')

trait('DatabaseTransactions')
trait('Test/ApiClient')

const ErpFile = use('App/Models/ErpFile')
const Factory = use('Factory')

test('[Index] it should return all erp file', async ({ client }) => {
  await Factory.model('App/Models/ErpFile').createMany(10)

  const response = await client.get('erp/files').send().end()

  response.assertStatus(200)

  const erp_files = await ErpFile.query().paginate(1)

  response.assertJSON({ erp_files: erp_files.toJSON() })
})

test('[Store] it should return the erp file when created', async ({
  client,
}) => {
  const employee = await Factory.model('App/Models/Employee').create()

  const response = await client
    .post('erp/files')
    .send({
      name: 'teste',
      original_url: 'www.teste.com',
      shortened_url: 'www.t.com',
      employees_id: employee.id,
      file_id: '1',
    })
    .end()

  response.assertStatus(201)

  const erp_file = await ErpFile.firstOrFail()

  response.assertJSON({ erp_file: erp_file.toJSON() })
})

test('[Destroy] it should delete erp file', async ({ assert, client }) => {
  const erp_file = await Factory.model('App/Models/ErpFile').create()

  const response = await client.delete(`erp/files/${erp_file.id}`).send().end()

  response.assertStatus(204)

  assert.equal(await ErpFile.getCount(), 0)
})
