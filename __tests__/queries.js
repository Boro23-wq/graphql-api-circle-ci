/* __tests__/queries.js */
const app = require('../src/server');
const supertest = require('supertest');
const { stopDatabase } = require('../src/database');

const request = supertest(app);

// describe('tests', () => {
//   beforeEach(() => {
//     jest.setTimeout(10000);
//   });
// });

afterAll(async () => {
  await stopDatabase();
});

test('fetch users', async (done) => {
  await request
    .post('/graphql')
    .send({
      query: '{ users{ id, name} }',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.users.length).toEqual(3);
      done();
    });
});
