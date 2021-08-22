import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileController {
  async profile({ response, auth }: HttpContextContract) {
    try {
      return auth.user
    } catch (error) {
      response.json({ error: 'Missing or invalid jwt token' })
    }
  }
}
