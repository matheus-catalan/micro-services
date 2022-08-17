'use strict'

const Users = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')
const crypto = use('crypto')
const moment = use('moment')
const Axios = use('axios')

const Helpers = use('Helpers')

class UserController {
  async index({ response }) {
    const users = await Users.query()
      .with('roles')
      .with('permissions')
      .with('modules')
      .fetch()

    return response.status(200).send({ users })
  }

  async store({ response, request }) {
    const { permissions, roles, modules, ...data } = request.only([
      'username',
      'email',
      'is_active',
      'permissions',
      'roles',
      'modules',
    ])

    data.password = Env.get('PASS_DEFAULT')

    try {
      const user = await Users.create(data)

      data.password = Env.get('PASS_DEFAULT')

      if (roles) {
        await user.roles().attach(roles)
      }

      if (permissions) {
        await user.permissions().attach(permissions)
      }

      if (modules) {
        await user.modules().attach(modules)
      }

      await user.loadMany(['roles', 'permissions', 'modules'])

      return response.status(201).send({ user })
    } catch (error) {
      console.log(error)
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async show({ response, params }) {
    try {
      const user = await Users.findOrFail(params.id)

      await user.loadMany(['roles', 'permissions', 'modules'])

      return response.status(200).send({ user })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async update({ response, request, params }) {
    const { permissions, roles, modules, ...data } = request.only([
      'username',
      'email',
      'password',
      'is_active',
      'permissions',
      'roles',
      'modules',
    ])

    const user_photo = request.file('user_photo', {
      types: ['image'],
      size: '2mb',
    })

    try {
      const user = await Users.findOrFail(params.id)

      if (user_photo) {
        await Axios.post(`${Env.get('API_FILES')}/v1/files`, {
          file: user_photo,
          folder: 'users',
        })
      }

      user.merge(data)

      await user.save()

      if (roles) {
        await user.roles().sync(roles)
      }

      if (permissions) {
        await user.permissions().sync(permissions)
      }

      if (modules) {
        await user.modules().sync(modules)
      }

      await user.loadMany(['roles', 'permissions', 'modules'])

      return response.status(202).send({ user })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async destroy({ response, params }) {
    try {
      const user = await Users.findOrFail(params.id)

      await user.delete()

      return response.status(204).send()
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async forgotPassword({ response, request }) {
    const { email } = request.only('email')

    const token = await crypto.randomBytes(10).toString('hex')

    try {
      const user = await Users.findByOrFail('email', email)

      user.token_forgot_password = token
      user.token_created_at = new Date()
      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          token,
          url: `${Env.get('FRON-ERP')}/forgot/password/${token}`,
        },
        (message) => {
          message
            .to(Env.get('MAIL_UAUFI'))
            .from(user.email, user.name)
            .subject('Recuperação de senha')
            .embed(Helpers.publicPath('logo.jpg'), 'logo')
            .embed(
              Helpers.publicPath('footer_mail_contract.png'),
              'footer_mail_contract'
            )
        }
      )
      return response.status(200).send()
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async forgotPasswordSave({ response, request }) {
    const { token, password, confirmed_password } = request.all()

    try {
      const user = await Users.findByOrFail('token_forgot_password', token)

      const tokenExpired = moment()
        .subtract('1', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ erro: { message: 'O token de recuperação está expirado' } })
      }

      if (password !== confirmed_password) return response.status(401).send()

      user.token_forgot_password = null
      user.token_created_at = null
      user.password = password
      await user.save()

      return response.status(200).send()
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }
}

module.exports = UserController
