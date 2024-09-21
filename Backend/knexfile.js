// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg", // PostgreSQL client
    connection:
      "postgresql://pratibimb_owner:ilNnXD7A9qxW@ep-curly-meadow-a13us44s.ap-southeast-1.aws.neon.tech/pratibimb?sslmode=require",
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
