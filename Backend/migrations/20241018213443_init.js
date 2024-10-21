// migrations/20240101010101_create_users_table.js (the timestamp will vary)

export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Primary key
    table.string('name')
    table.string('email')
    table.string('avatar').defaultTo("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); // Avatar field
    table.string('batch')
    table.string('branch')
    table.string('enrollment')
    table.timestamps(true, true); // Created at and updated at timestamps
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('users'); // Drop users table if it exists
}
