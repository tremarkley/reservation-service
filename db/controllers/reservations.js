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

const getReservationDataForMonth =
function getReservationDataForMonth(knex, listingId, month, year) {
  return new Promise((resolve, reject) => {
    knex.select('listing_id', 'date_id', 'price', 'available').from('reservations')
      .then(reservations => resolve(reservations))
      .catch(err => reject(err));
  });
};

module.exports = getReservationDataForMonth;
