//  get reservations for each day of the month for specified month, year, and listing
// Array of Reservation Objects for each day of the month
// Fields:
// Id: Number
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

const getReservationDataForMonth =
function getReservationDataForMonth(knex, listingId, month, year) {
  return new Promise((resolve, reject) => {
    knex('dates').where({ month, year }).select('id')
      .then((dateIdObjects) => {
        const dateIds = [];
        for (let i = 0; i < dateIdObjects.length; i += 1) {
          dateIds.push(dateIdObjects[i].id);
        }
        return knex('reservations').where({ listing_id: listingId }).select('listing_id', 'date_id', 'price', 'available').whereIn('date_id', dateIds)})
      .then(reservations => resolve(reservations))
      .catch(err => reject(err));
  });
};

module.exports = getReservationDataForMonth;
