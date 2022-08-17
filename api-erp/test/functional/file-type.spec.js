'use strict'

const { test, trait } = use('Test/Suite')('File Type')

trait('DatabaseTransactions')
trait('Test/ApiClient')

const FileType = use('App/Models/FileType')
const Factory = use('Factory')

test('[Index] it should return all permissions', async ({ client }) => {
  await Factory.model('App/Models/FileType').createMany(10)

  const response = await client.get('file/type').send().end()

  response.assertStatus(200)

  const file_types = await FileType.all()

  response.assertJSON({ file_types: file_types.toJSON() })
})

test('[Store] it should return the employee files when created', async ({
  client,
}) => {
  await FileType.truncate()

  const response = await client
    .post('file/type')
    .send({
      name: 'CONTRACT',
      key: 'CONTRACT',
      is_active: 1,
    })
    .end()

  response.assertStatus(201)

  const file_type = await FileType.firstOrFail()

  response.assertJSON({ file_type: file_type.toJSON() })
})

test('[Update]  it should return File Type when updated', async ({
  client,
}) => {
  await FileType.truncate()

  const file_type = await Factory.model('App/Models/FileType').create()

  const _fileTypePayload = {
    name: 'test office',
  }

  const response = await client
    .put(`/file/type/${file_type.id}`)
    .send(_fileTypePayload)
    .end()

  response.assertStatus(202)

  const _file_type = await FileType.firstOrFail()

  response.assertJSON({ file_type: _file_type.toJSON() })
})

test('[Destroy] it should delete File Type', async ({ assert, client }) => {
  await FileType.truncate()

  const file_type = await Factory.model('App/Models/FileType').create()

  const response = await client
    .delete(`/file/type/${file_type.id}`)
    .send()
    .end()

  response.assertStatus(204)

  assert.equal(await FileType.getCount(), 0)
})
