/* __tests__/queries.js */
const app = require('../src/server');
const supertest = require('supertest');
const { stopDatabase } = require('../src/database');

const request = supertest(app);

jest.setTimeout(10000);

afterAll(async () => {
  await stopDatabase();
});

test('fetch users', async (done) => {
  request
    .post('/graphql')
    .send({
      query: '{ users{ id, name} }',
    })
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.users.length).toEqual(3);
      done();
    });
});

test('query that does not exist', async () => {
  const response = await request
    .post('/graphql')
    .send({
      query: '{ events{ id, name} }',
    })
    .set('Accept', 'application/json');

  expect(response.status).toBe(400);
});
