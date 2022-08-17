'use strict'

const { test } = use('Test/Suite')('Email')
const Factory = use('Factory')
const Mail = use('Mail')
const Env = use('Env')

test('[Sending mail] it should send email', async ({ assert }) => {
  const user = await Factory.model('App/Models/User').create()

  Mail.fake()

  await Mail.raw('email send by automated unit test', (message) => {
    message.from(user.email)
    message.to(Env.get('MAIL_UAUFI'), 'UAU-FI')
  })

  const recentEmail = await Mail.pullRecent()

  assert.equal(recentEmail.envelope.from, `${user.email}`)
  assert.equal(recentEmail.envelope.to, `${Env.get('MAIL_UAUFI')}`)

  Mail.restore()
})
