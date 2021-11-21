import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stats from 'App/Models/Stats'
import CreateStatsValidator from 'App/Validators/Stats/CreateStatsValidator'
import { AmoniaStats } from 'App/Enum/AmoniaStats.enum'
import Device from 'App/Models/Device'

export default class StatsController {
  public async store({ request }: HttpContextContract) {
    const requestData = await request.validate(CreateStatsValidator)
    if (requestData.amonia !== 'undetected') {
      const device = await Device.findByOrFail('device_id', requestData.device_id)
      const stats = new Stats()
      stats.fill({
        is_habitable: StatsController.verifyIsHabitable(requestData.amonia as AmoniaStats),
        aquariumId: device.aquariumId,
        amonia: requestData.amonia as AmoniaStats,
      })
      return stats.save()
    } else {
      return 'stats: undetected'
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const stats = await Stats.findOrFail(params.id)
    await stats.delete()
    return stats
  }

  private static verifyIsHabitable(stats: AmoniaStats): boolean {
    switch (stats) {
      case AmoniaStats.SAFE:
        // TODO send notification
        return true

      case AmoniaStats.DANGEROUS:
        // TODO send notification
        return false
    }
  }
}
