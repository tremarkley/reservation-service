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

module.exports = getReservationDataForMonth;
