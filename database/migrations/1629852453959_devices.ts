import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Devices extends BaseSchema {
  protected tableName = 'devices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('aquarium_id')
        .unsigned()
        .references('id')
        .inTable('aquariums')
        .onDelete('CASCADE')
      table.string('device_id', 255)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
