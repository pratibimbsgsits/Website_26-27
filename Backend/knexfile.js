// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg", // PostgreSQL client
    connection:
      "postgresql://pratibimb_db_owner:7eIQyMnj6mul@ep-solitary-cloud-a1971v61.ap-southeast-1.aws.neon.tech/pratibimb_db?sslmode=require",
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
