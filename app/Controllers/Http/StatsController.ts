import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stats from 'App/Models/Stats'
import CreateStatsValidator from 'App/Validators/Stats/CreateStatsValidator'
import { AmoniaStats } from 'App/Enum/AmoniaStats.enum'
import Device from 'App/Models/Device'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class StatsController {
  public async store({ request }: HttpContextContract) {
    const requestData = await request.validate(CreateStatsValidator)
    if (requestData.amonia !== 'undetected') {
      const device = await Device.findByOrFail('device_id', requestData.device_id)
      const user = await User.findByOrFail('id', device.userId)
      const stats = new Stats()
      stats.fill({
        is_habitable: await StatsController.verifyIsHabitable(
          requestData.amonia as AmoniaStats,
          user.email
        ),
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

  private static async verifyIsHabitable(stats: AmoniaStats, mailTo: string): Promise<boolean> {
    switch (stats) {
      case AmoniaStats.SAFE:
        try {
          await Mail.send((message) => {
            message
              .from('No reply <contac@aquacare.com>')
              .to(mailTo)
              .subject('Atualização de Status de Amonia no Seu Aquário').html(`
                <h1> Ocorreu uma atualização no status da amonia do seu aquário!</h1>
                <p>
                  O nivel de amonia atual é: Seguro / Em Alerta.
                </p>
              `)
          })

          return true
        } catch (error) {
          return true
        }

      case AmoniaStats.DANGEROUS:
        try {
          await Mail.send((message) => {
            message
              .from('No reply <contac@aquacare.com>')
              .to(mailTo)
              .subject('Atualização de Status de Seu Aquário').html(`
                <h1> Ocorreu uma atualização no status da amonia do seu aquário!</h1>
                <p>
                  O nivel de amonia atual é: Alarmante / Tóxico. <br>
                  É importante tomar medidas para corrigir o nivel de amonia do seu aquário, afim de evitar problemas e desconfortos ao seus peixes!
                </p>
              `)
          })
          return false
        } catch (error) {
          return false
        }
    }
  }
}
