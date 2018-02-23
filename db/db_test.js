const config = require('../knexfile.js');

const env = 'test';
const knex = require('knex')(config[env]);

module.exports = knex;
