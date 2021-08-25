import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeviceLoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    device_id: schema.string(),
  })

  public messages = {
    'device_id.required': 'O id do dispositivo é necessário',
  }
}
