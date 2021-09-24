import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import DeviceLoginValidator from 'App/Validators/Device/DeviceLoginValidator'
import Device from 'App/Models/Device'

export default class LoginController {
  async login({ request, auth }: HttpContextContract) {
    const userData = await request.validate(LoginValidator)
    const { email, password } = userData
    return auth.use('api').attempt(email, password)
  }

  async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { message: 'LOGOUT ...' }
  }

  async deviceLogin({ request, auth }: HttpContextContract) {
    const deviceData = await request.validate(DeviceLoginValidator)
    const device = await Device.findByOrFail('device_id', deviceData.device_id)
    return auth.use('device').login(device)
  }
}
