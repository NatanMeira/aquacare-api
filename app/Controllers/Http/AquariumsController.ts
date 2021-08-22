import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aquarium from 'App/Models/Aquarium'
import UpdateAquariumValidator from 'App/Validators/Aquarium/UpdateAquariumValidator'
import CreateAquariumValidator from 'App/Validators/Aquarium/CreateAquariumValidator'

export default class AquariumsController {
  public async index({}: HttpContextContract) {
    return Aquarium.all()
  }

  public async store({ request }: HttpContextContract) {
    const aquariumData = await request.validate(CreateAquariumValidator)
    return Aquarium.create(aquariumData)
  }

  public async show({ params }: HttpContextContract) {
    return Aquarium.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const aquariumData = await request.validate(UpdateAquariumValidator)
    const aquarium = await Aquarium.findOrFail(params.id)
    aquarium.merge(aquariumData)
    return aquarium.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const aquarium = await Aquarium.findOrFail(params.id)
    await aquarium.delete()
    return aquarium
  }

  public async getStats({ params }: HttpContextContract) {
    const aquarium = await Aquarium.findOrFail(params.id)
    const stats = await aquarium.related('stats').query()
    return stats
  }
}
