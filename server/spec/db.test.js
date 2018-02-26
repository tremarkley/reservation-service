process.env.NODE_ENV = 'test';

const reservations = require('../../db/controllers/reservations');

describe('getReservationDataForMonth returns reservation object', () => {
  it('Should return object containing all reservations inside the reservations db', () =>
    reservations.getReservationDataForMonth(1, 1, 2018)
      .then((reservationsArray) => {
        for (let i = 0; i < reservationsArray.length; i += 1) {
          expect(reservationsArray[i].listing_id).toBe(1);
          expect(reservationsArray[i].month).toBe(1);
          expect(reservationsArray[i].day).toBe(i + 1);
          expect(reservationsArray[i].year).toBe(2018);
          expect(reservationsArray[i]).toHaveProperty('minimum_stay');
          expect(reservationsArray[i]).toHaveProperty('maximum_guests');
          expect(reservationsArray[i]).toHaveProperty('price');
          expect(reservationsArray[i]).toHaveProperty('available');
        }
      }));
});
