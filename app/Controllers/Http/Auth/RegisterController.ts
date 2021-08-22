import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'

export default class RegisterController {
  async register({ request }: HttpContextContract) {
    const userData = await request.validate(RegisterValidator)
    return User.create(userData)
  }
}
