process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest');

describe('Test the root path', () => {
  it('Should respond to GET method', () =>
    request(app).get('/')
      .then((response) => {
        expect(response.status).toBe(200);
      }));
});
