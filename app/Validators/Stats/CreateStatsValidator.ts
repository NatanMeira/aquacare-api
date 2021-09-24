import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AmoniaStats } from 'App/Enum/AmoniaStats.enum'

export default class CreateStatsValidator {
  private amonia: any[] = [];

  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    device_id: schema.string(),
    amonia: schema.enum([...Object.values(AmoniaStats), 'undetected']),
  })

  public messages = {
    'amonia.required': 'A amonia do é necessário',
    'device_id.required': 'O id do dispositivo é necessário',
  }
}
