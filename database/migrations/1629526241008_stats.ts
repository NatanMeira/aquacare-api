import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { AmoniaStats } from 'App/Enum/AmoniaStats.enum'

export default class AquariumStats extends BaseSchema {
  protected tableName = 'stats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('aquarium_id')
        .unsigned()
        .references('id')
        .inTable('aquariums')
        .onDelete('CASCADE')
      table.enum('amonia', Object.values(AmoniaStats)).notNullable()
      table.boolean('is_habitable').defaultTo('false')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
