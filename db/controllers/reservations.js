const knex = require('../../db/knex.js');

// gets all reservation data for the month on a specified listingId, month and year
// ordered by day in ascending order
const getReservationDataForMonth =
function getReservationDataForMonth(listingId, month, year) {
  return new Promise((resolve, reject) => {
    console.log(`Calling get Reservation Data: ${listingId}, ${month}, ${year}`);
    knex('dates').where({ month, year }).select('id')
      .then((dateIdObjects) => {
        const dateIds = [];
        for (let i = 0; i < dateIdObjects.length; i += 1) {
          dateIds.push(dateIdObjects[i].id);
        }
        return knex('reservations').where({ listing_id: listingId }).select('listing_id', 'listings.minimum_stay', 'listings.maximum_guests', 'dates.month', 'dates.day', 'dates.year', 'price', 'available').whereIn('date_id', dateIds)
          .innerJoin('dates', 'reservations.date_id', 'dates.id')
          .innerJoin('listings', 'reservations.listing_id', 'listings.id')
          .orderBy('dates.day', 'asc');
      })
      .then(reservations => resolve(reservations))
      .catch(err => reject(err));
  });
};

const makeReservation = function makeReservation(listingId, checkInDate, checkOutDate) {
  let price = 0;
  return new Promise((resolve, reject) => {
    knex('dates').where('date', '>=', checkInDate).andWhere('date', '<', checkOutDate).select('id')
      .then((dateIdObjects) => {
        const dateIds = [];
        for (let i = 0; i < dateIdObjects.length; i += 1) {
          dateIds.push(dateIdObjects[i].id);
        }
        return knex('reservations').where({ listing_id: listingId }).select('id', 'listing_id', 'price', 'available').whereIn('date_id', dateIds);
      })
      .then((reservations) => {
        const reservationIds = [];
        for (let i = 0; i < reservations.length; i += 1) {
          price += +reservations[i].price;
          reservationIds.push(reservations[i].id);
          if (!reservations[i].available) {
            throw new Error('Reservation not available through dates!');
          }
        }
        return knex('reservations').whereIn('id', reservationIds).update('available', false);
      })
      .then(() => resolve(price))
      .catch(err => reject(err));
  });
};

module.exports = { getReservationDataForMonth, makeReservation };
