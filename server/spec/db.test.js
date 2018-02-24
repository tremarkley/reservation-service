const reservations = require('../../db/controllers/reservations');
const knex = require('../../db/db_test');

describe('getReservationDataForMonth returns reservation object', () => {
  it('Should return object containing all reservations inside the reservations db', () => {
    expect.assertions(1);
    return reservations.getReservationDataForMonth(knex, 1, 1, 2018)
      .then((reservationsArray) => {
        console.log(JSON.stringify(reservationsArray));
        expect(reservationsArray[0].listing_id).toBe(1);
      });
  });
});
