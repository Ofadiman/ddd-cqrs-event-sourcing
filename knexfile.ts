import { Knex } from 'knex'

const knexConfig: Knex.Config = {
  // Specifies how much time must elapse before throwing an error related to exceeding the maximum timeout for creating a connection.
  acquireConnectionTimeout: 10_000,
  // Saves a stack trace of the error thrown by the db driver.
  // By default, Node.js removes the stack trace if there is an `await` keyword before the function that threw the error.
  asyncStackTraces: true,
  client: `pg`,
  connection: {
    database: 'postgres',
    host: 'database',
    password: 'password',
    port: 5432,
    user: 'admin',
  },
  migrations: {
    directory: `src/database/migrations`,
    tableName: `migrations`,
  },
  // Specifies the minimum and maximum number of connections in a pool.
  pool: {
    max: 20,
    min: 1,
  },
  seeds: {
    directory: `src/database/seeds`,
  },
}

export default knexConfig
