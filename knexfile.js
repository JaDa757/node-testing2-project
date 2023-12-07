module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './dev.sqlite3',
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
      useNullAsDefault: true,
    },
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './test.sqlite3',
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
      useNullAsDefault: true,
    },
  };
  