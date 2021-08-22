import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class LoginController {
  async login({ request, auth }: HttpContextContract) {
    const userData = await request.validate(LoginValidator)
    const { email, password } = userData
    return auth.use('api').attempt(email, password)
  }

  async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { message: 'LOGOUT ...' }
  }
}
