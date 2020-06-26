const dotenv = require('dotenv');
//const knexStringcase = require('knex-stringcase');

dotenv.config({ path: './config.env' });

options = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_LOCAL_SERVER,
      user: process.env.DATABASE_LOCAL_USER,
      password: process.env.DATABASE_LOCAL_PASSWORD,
      database: process.env.DATABASE_LOCAL_DATABASE,
      timezone: '-00:00',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_SERVER,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      timezone: '-00:00',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    // migratios: {
    //   tableName: 'knex_migrations',
    //   directory: './db/migrations',
    // },
    // seeds: {
    //   directory: './db/seeds',
    // },
  },
};

module.exports = {
  development: options['development'],
  production: options['production'],
};
