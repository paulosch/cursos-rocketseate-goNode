'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ response, request, auth }) {
    try {
      const user = await User.findOrFail(auth.user.id)
      const data = request.only(['username', 'password'])

      user.merge(data)

      await user.save()

      return user
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo deu errado.' } })
    }
  }
}

module.exports = UserController
