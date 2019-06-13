const request = require('supertest');
const test = require('tape');

const app = require('../../app');
const {
  buildDb,
  buildStaticData,
  buildFakeData,
} = require('../../database/config/build');

test('testing getUser route', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .get('/api/v1/user')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .expect(200)
        .end((error, response) => {
          const user = response.body.data;
          console.log(user);
          t.equal(typeof user, 'object', 'should be object');
          t.equal(Object.keys(user).length >= 11, true, 'should be equal to or more than 11 keys');
          t.equal(Object.keys(user).includes('first_name'), true, 'should be true');
          t.end();
        });
    });
});
