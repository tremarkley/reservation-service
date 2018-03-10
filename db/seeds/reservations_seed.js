const listingData = require('../data/listings');
const datesData = require('../data/dates');
const reservationsData = require('../data/reservations');

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
  })
  .catch((err) => {
    console.log(`exception in seeding: ${err}`);
  });

