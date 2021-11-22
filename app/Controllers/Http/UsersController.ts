import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

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
    const user = await User.findOrFail(loggedUser.id)
    const aquariums = await user.related('aquariums').query().first()
    if (aquariums) {
      const stats = await aquariums.related('stats').query().orderBy('created_at', 'desc').first()
      if (stats) {
        return { ...aquariums?.$attributes, ...stats?.$attributes }
      } else {
        return response.notFound()
      }
    }
    return response.notFound()
  }
}
