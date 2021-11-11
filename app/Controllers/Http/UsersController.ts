import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async getAquariums({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return await user.related('aquariums').query()
  }

  public async getDevices({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return await user.related('devices').query()
  }

  public async getLastUpdateAquariumWithStats({ auth, response }: HttpContextContract) {
    const loggedUser = auth.user as User
    const query = await Database.rawQuery(
      'select S.*, A.`name`, A.liters from stats S inner join aquariums A on S.aquarium_id = A.id inner join users U on A.user_id = U.id where U.id = ? ORDER BY S.created_at DESC limit 1',
      [loggedUser.id]
    )
    if (query && query[0]) {
      return query[0]
    } else {
      return response.notFound()
    }
  }
}
