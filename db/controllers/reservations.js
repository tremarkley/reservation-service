const knex = require('../../db/knex.js');

//  get reservations for each day of the month for specified month, year, and listing
// Array of Reservation Objects for each day of the month
// Fields:
// Listing_Id: Number
// Minimum-stay: Number
// Maximum-guests: Number
// Month: Number
// Day: Number
// Year: Number
// Price: Number
// Available: Boolean

// 0. get the listing information from the listing table
// 1. get all date id's for the given month
// 2. for each date id look for it's corresponding reservation in the reservation table
// 3. put all of this information into a single object

// right now we are getting {"listing_id":1,"date_id":1,"price":"300.00","available":true}
// gets all reservation data for the month on a specified listingId, month and year
// ordered by day in ascending order
const getReservationDataForMonth =
function getReservationDataForMonth(listingId, month, year) {
  return new Promise((resolve, reject) => {
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

//  input: listing id, check in date, check out date (mm-dd-yyyy)
//  When getting date id's do a query by >= check in date and < check out date
//  first thing we need to do is check if the reservation is even possible
//  loop through all dates from check in to check out (dont include check out)
//  if available is true for each then we must go through and change each to false and call resolve
//  if available is false for one then we must call reject
//  output is total price of reservation
const makeReservation = function makeReservation(listingId, checkInDate, checkOutDate) {
  let price = 0;
  return new Promise((resolve, reject) => {
    // const checkInDateObj = new Date(checkInDate);
    // const checkOutDateObj = new Date(checkOutDate);
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
          price += reservations[i].price;
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
