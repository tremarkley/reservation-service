process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest');
const knex = require('../../db/knex');

describe('Test API routes', () => {
  beforeEach(done => knex.seed.run()
    .then(() => done()));

  describe('Test the root path', () => {
    it('Should respond to GET method', () =>
      request(app).get('/')
        .then((response) => {
          expect(response.status).toBe(200);
        }));
  });

  describe('Test the router', () => {
    it('GET request should return reservation data for the month', () =>
      request(app).get('/2').send({ month: 1, year: 2018 })
        .then((response) => {
          expect(response.status).toBe(200);
          const reservationsArr = JSON.parse(response.text);
          for (let i = 0; i < reservationsArr.length; i += 1) {
            expect(reservationsArr[i].listing_id).toBe(2);
            expect(reservationsArr[i].month).toBe(1);
            expect(reservationsArr[i].year).toBe(2018);
          }
        }));
    it('successful PUT request should return the total price for the month', () =>
      request(app).put('/1').send({ checkInDate: '01-01-2018', checkOutDate: '01-03-2018' })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(JSON.parse(response.text).price).toEqual(600);
        }));
  });
});
