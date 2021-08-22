import BaseSchema from '@ioc:Adonis/Lucid/Schema'

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
      table.string('amonia', 255).notNullable()
      table.string('ph', 255).notNullable()
      table.boolean('is_habitable').defaultTo('false')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
