process.env.NODE_ENV = 'test';

const reservations = require('../../db/controllers/reservations');
const knex = require('../../db/knex');

describe('Database Controller Methods', () => {
  beforeEach(done => knex.seed.run()
    .then(() => done()));

  describe('getReservationDataForMonth', () => {
    it('Should return object containing all reservations inside the reservations db', () => {
      expect.hasAssertions();
      return reservations.getReservationDataForMonth(1, 1, 2018)
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
        });
    });
  });

  describe('makeReservation', () => {
    it('Should throw an error if dates are not all available', () => {
      expect.assertions(1);
      return expect(reservations.makeReservation(1, '1-1-2018', '1-4-2018')).rejects.toEqual(new Error('Reservation not available through dates!'));
    });
    it('Should throw an error if dates are not all available', (done) => {
      expect.assertions(1);
      reservations.makeReservation(1, '1-1-2018', '1-4-2018')
        .catch(() => {
          reservations.getReservationDataForMonth(1, 1, 2018)
            .then((reservationsArray) => {
              expect(reservationsArray[0].available).toBe(true);
              done();
            });
        });
    });
    it('Should change availability to false for all days between check in and check out if a reservation is made successfully', (done) => {
      expect.assertions(3);
      reservations.makeReservation(1, '1-1-2018', '1-3-2018')
        .then(price => expect(price).toBe(600))
        .then(() => {
          reservations.getReservationDataForMonth(1, 1, 2018)
            .then((reservationsArray) => {
              expect(reservationsArray[0].available).toBe(false);
              expect(reservationsArray[1].available).toBe(false);
              done();
            });
        });
    });
  });
});
