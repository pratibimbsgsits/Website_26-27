/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('events', (table) => {
        table.increments('event_id').primary();
        table.string('event_name').notNullable();
        table.string('description').notNullable();
        table.dateTime('start_date').notNullable();
        table.string('location');
        table.enum('status', ['PAST', 'ONGOING', 'UPCOMING']).notNullable(); // Fixed typo from 'UPCOMIG' to 'UPCOMING'
        table.integer('ticket_price').notNullable();
        table.string('event_logo');
        table.string('event_poster');
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */



exports.down = function(knex) {
    return knex.schema.dropTable('events')
}
