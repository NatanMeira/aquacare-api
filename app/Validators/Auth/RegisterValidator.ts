import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(200)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(100),
    ]),
    password: schema.string({ trim: false }, [rules.confirmed()]),
    // rememberMe: schema.boolean(),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'name.required': 'O nome é necessário',
    'name.minLength': 'O nome deve ter no mínimo 5 caracteres',
    'name.maxLength': 'O nome deve ter no máximo 200 caracteres',

    'email.required': 'O email é necessário',
    'email.email': 'O e-mail informado não é válido',
    'email.unique': 'Já existe outro cadastro com este mesmo e-mail',
    'email.maxLength': 'O e-mail deve ter no máximo 100 caracteres',

    'password.required': 'A senha é necessária',
    'password_confirmation.confirmed': 'As senhas não coincidem',

    'rememberMe.required': 'É necessário informar se o usuário deve ser lembrado',
  }
}
