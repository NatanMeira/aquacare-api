import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stats from 'App/Models/Stats'
import CreateStatsValidator from 'App/Validators/Stats/CreateStatsValidator'

export default class StatsController {
  public async index({}: HttpContextContract) {
    return Stats.all()
  }

  public async store({ request }: HttpContextContract) {
    const statsData = await request.validate(CreateStatsValidator)
    return Stats.create(statsData)
  }

  public async show({ params }: HttpContextContract) {
    return Stats.findOrFail(params.id)
  }

  public async destroy({ params }: HttpContextContract) {
    const stats = await Stats.findOrFail(params.id)
    await stats.delete()
    return stats
  }
}
