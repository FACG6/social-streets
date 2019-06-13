const test = require('tape');
const request = require('supertest');
const app = require('../../../server/app');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

test('post in /api/v1/user (with valid data)', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .post('/api/v1/user')
        .send({
          user: {
            firstName: 'amin',
            lastName: 'alakhsham',
            email: 'amin@gmail.com',
            password: 'aminamin',
            typeOfBusiness: 'Business',
            website: 'https://www.socialstreets.com',
            orgName: 'social-street',
            address: 'gaza',
            city: 'gaza',
            country: 'palestine',
            zipCode: '45214',
            facebook: 'https://fb.com/aminalakhsham',
            twitter: 'https://twitter.com/aminalakhsham',
            instagram: 'https://www.instagram.com/aminalakhsham',
          },
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.body.error) {
            t.error(res.body.error);
          } else {
            t.deepEqual(
              Object.keys(res.body.data),
              [
                'id',
                'first_name',
                'last_name',
                'email',
                'business_type',
                'website',
                'organisation_name',
                'address',
                'city',
                'country',
                'zip_code',
                'facebook',
                'instagram',
                'twitter',
                'avatar',
              ],
              'update project and it users sucssfully',
            );
            t.end();
          }
        });
    })
    .catch(err => console.log(err));
});

test.onFinish(() => process.exit(0));
