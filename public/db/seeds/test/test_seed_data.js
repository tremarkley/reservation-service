const datesData = require('../../data/test/dates');
const listingData = require('../../data/test/listings');
const reservationsData = require('../../data/test/reservations');

exports.seed = (knex, Promise) => knex('reservations').del()
  .then(() => knex('dates').del())
  .then(() => knex('listings').del())
  .then(() => knex('listings').insert(listingData))
  .then(() => knex('dates').insert(datesData))
  .then(() => {
    const promises = [];
    for (let i = 0; i < reservationsData.length; i += 1) {
      promises.push(knex('reservations').insert(reservationsData[i]));
    }
    return Promise.all(promises);
  });