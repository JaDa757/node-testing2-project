module.exports = {
    development: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: '. dev.sqlite3',
      },
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },      
    },
    
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './test.sqlite3',
      },
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
      useNullAsDefault: true,
    },
  };
  