import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAquariumValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number(),
    name: schema.string(),
    liters: schema.number(),
  })

  public messages = {
    'user_id.required': 'O id do usuario é necessário',
    'name.required': 'O nome do aquario é necessário',
    'liters.required': 'A quantidade de litros é necessária',
  }
}
