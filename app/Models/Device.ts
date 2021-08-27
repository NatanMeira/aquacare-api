import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Aquarium from 'App/Models/Aquarium'

export default class Device extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public aquariumId: number

  @column()
  public device_id: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Aquarium)
  public aquarium: BelongsTo<typeof Aquarium>
}
