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
          oldPassword: '123',
          newPassword: '123456789',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          // console.log("00000000000000000000000000000000");
          if (err){
            // t.error(console.log("error is here : =>> ", err));
            console.log("The Res =>> ", res.text);
          }
          t.equal(JSON.parse(res.text).data, 'Updated Password Successfully', 'Updated');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
