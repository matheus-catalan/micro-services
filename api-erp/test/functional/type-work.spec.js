'use strict'

const { test, trait } = use('Test/Suite')('Type Work')

trait('DatabaseTransactions')
trait('Test/ApiClient')

const TypeWork = use('App/Models/TypeWork')

test('[Index] it should return all type works', async ({ client }) => {
  const response = await client.get('type/work').send().end()

  response.assertStatus(200)

  const type_works = await TypeWork.all()

  response.assertJSON({ type_works: type_works.toJSON() })
})
