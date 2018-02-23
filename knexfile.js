// Update with your config settings.
const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://hmarkley:@localhost:5432/reservations',
    seeds: {
      directory: path.join(__dirname, '/public/db/seeds'),
    },
  },
};
