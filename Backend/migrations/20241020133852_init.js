/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("attendees",(table)=>{
        table.increments("attendee_id").primary()
        table.integer('event_id').notNullable()
        table.string('team_name').notNullable()
        table.integer('team_members').notNullable()
        table.string('attendee_name').notNullable()
        table.string('attendee_email').notNullable()
        table.string('attendee_phone').notNullable()
        table.string('order_id')
        table.enum('payment_status',['PENDING','APPROVED'])
        table.string('qr_code')
        table.timestamps(true,true)
    })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('attendees')
}
