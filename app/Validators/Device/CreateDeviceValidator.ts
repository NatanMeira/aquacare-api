import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDeviceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    device_id: schema.string(),
    user_id: schema.number(),
  })

  public messages = {
    'device_id.required': 'O id do dispositivo é necessário',
    'user_id.required': 'O id do usuario é necessário',
  }
}
