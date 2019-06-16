const test = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const {
  buildDb,
  buildFakeData,
  buildStaticData,
} = require('./../../database/config/build.js');

test('PUT in /api/v1/user/password', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .put('/api/v1/user/password')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
        ])
        .send({
          oldPassword: '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW',
          newPassword: '123',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) t.error(err);
          t.deepEqual(res.body.data, 'Updated Password Successfully', 'Updated');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
