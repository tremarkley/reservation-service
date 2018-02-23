const listingData = require('../data/listings');
const datesData = require('../data/dates');
const reservationsData = require('../data/reservations');

exports.seed = knex => knex('reservations').del()
  .then(() => knex('dates').del())
  .then(() => knex('listings').del())
  .then(() => knex('listings').insert(listingData))
  .then(() => knex('dates').insert(datesData))
  .then(() => {
    console.log(reservationsData.length);
    return knex('reservations').insert(reservationsData);
  });

