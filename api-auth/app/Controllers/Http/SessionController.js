'use strict'

const User = use('App/Models/User')

class SessionController {
  async store({ response, request, auth }) {
    const { email, password, module_required } = request.all()

    try {
      const user = await User.findByOrFail('email', email)

      await user.loadMany(['roles', 'permissions', 'modules'])

      const modules = await user.modules().load()

      if (!user.is_active) return response.status(401).send()

      const res = modules.rows.find((_module) => {
        return _module.toObject().name === module_required
      })

      if (!res) return response.status(401).send()

      const permissions = await user.permissions().load()

      const roles = await user.roles().load()

      const { token } = await auth.attempt(email, password)

      return response.status(200).send({
        username: user.username,
        email: user.email,
        token,
        modules,
        roles,
        permission: permissions,
      })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }

  async validate({ response, request, auth }) {
    const { permission_required } = request.only('permission_required')

    try {
      const user = await auth.getUser()

      if (await user.can(`${permission_required}`)) {
        return response.status(200).send()
      }

      return response.status(401).send({
        error: {
          message: 'E_INVALID_JWT_TOKEN: jwt must be provided',
          name: 'InvalidJwtToken',
        },
      })
    } catch (error) {
      return response
        .status(error.status ? error.status : 500)
        .send({ error: error.message })
    }
  }
}

module.exports = SessionController
