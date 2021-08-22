import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async getAquariums({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return await user.related('aquariums').query()
  }
}
