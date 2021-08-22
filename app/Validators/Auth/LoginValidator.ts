import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({ trim: false }),
  })

  public messages = {
    'email.required': 'O email é necessário',
    'email.email': 'O e-mail informado não é válido',
    'email.unique': 'Já existe outro cadastro com este mesmo e-mail',

    'password.required': 'A senha é necessária',
    'password.confirmed': 'As senhas não coincidem',

    // 'rememberMe.required': 'è necessário informar se o usuário deve ser lembrado',
  }
}
