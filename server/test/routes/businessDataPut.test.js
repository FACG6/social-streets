const tape = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('PUT in /api/v1/user/business || Valid', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/business')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '123',
          organisationName: 'nameNAME TEST',
          type: 'typeTYPE TEST',
          website: 'https://www.website_TEST.com',
          city: 'cityCITY TEST',
          country: 'countryCOUNTRY TEST',
          address: 'addressADDRESS TEST TEST',
          zipCode: 12345,
          facebook: 'https://www.facebook_TEST.com',
          twitter: 'https://www.twitter_TEST.com',
          instagram: 'https://www.instagram.com/username',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.data, 'Business Data Updated Successfully', 'PUT method on /business Work Successfully');
          t.end();
        });
    });
});

tape('PUT in /api/v1/user/business || Invalid Business Data', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/business')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '123',
          organisationName: 'nameT',
          type: 'typeT',
          website: 'www.website_TEST.com',
          city: 'cityT',
          country: 'countryT',
          address: 'addressT',
          zipCode: 1234,
          facebook: 'www.facebook_TEST.com',
          twitter: 'www.twitter_TEST.com',
          instagram: 'www.instagram.com/username',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Bad Request', 'Not updating Business with invalid DATA /business');
          t.end();
        });
    });
});

tape('PUT in /api/v1/user/business || Invalid Password', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      request(app)
        .put('/api/v1/user/business')
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
        .send({
          oldPassword: '************',
          organisationName: 'nameT',
          type: 'typeT',
          website: 'www.website_TEST.com',
          city: 'cityT',
          country: 'countryT',
          address: 'addressT',
          zipCode: 1234,
          facebook: 'www.facebook_TEST.com',
          twitter: 'www.twitter_TEST.com',
          instagram: 'www.instagram.com/username',
        })
        .expect(401)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          }
          t.equal(res.body.error, 'Retry, password is wrong', 'Not updating Business Data on /business with a WRONG PASSWORD');
          t.end();
        });
    });
});

tape.onFinish(() => process.exit(0));
