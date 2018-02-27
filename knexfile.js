// Update with your config settings.
const path = require('path');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://hmarkley:@localhost:5432/reservations_test',
    seeds: {
      directory: path.join(__dirname, '/public/db/seeds/test'),
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://hmarkley:@localhost:5432/reservations',
    seeds: {
      directory: path.join(__dirname, '/public/db/seeds'),
    },
  },
};
