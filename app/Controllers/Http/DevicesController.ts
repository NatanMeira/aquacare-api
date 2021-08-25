import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Device from 'App/Models/Device'
import CreateDeviceValidator from 'App/Validators/Device/CreateDeviceValidator'

export default class DevicesController {
  public async store({ request }: HttpContextContract) {
    const deviceData = await request.validate(CreateDeviceValidator)
    return Device.create(deviceData)
  }
}
