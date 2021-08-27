import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Aquarium from 'App/Models/Aquarium'
import { AmoniaStats } from 'App/Enum/AmoniaStats.enum'

export default class Stats extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public aquariumId: number

  @column()
  public amonia: AmoniaStats

  @column()
  public is_habitable: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Aquarium, { localKey: 'aquarium_id' })
  public user: BelongsTo<typeof Aquarium>
}
