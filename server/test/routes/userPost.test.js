const test = require('tape');
const request = require('supertest');
const app = require('../../../server/app');

test('post in /api/v1/user (with valid data)', (t) => {
  request(app)
    .post('/api/v1/user/')
    .send({
      user: {
        firstName: 'amin',
        lastName: 'alakhsham',
        email: 'amin@gmail.com',
        password: 'aminamin',
        orgName: 'social-street',
        typeOfBusiness: 'Business',
        website: 'www.socialstreets.com',
        address: 'gaza',
        city: 'gaza',
        country: 'palestine',
        zipCode: '45214',
        facebook: 'fb.com/aminalakhsham',
        twitter: 'twitter.com/aminalakhsham',
        instagram: 'instagram.com/aminalakhsham',
      },
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      console.log(err);
      // if (err) {
      //   t.error(err);
      // } else if (res.body.error) {
      //   t.error(res.body.error);
      // } else {
      //   t.deepEqual(
      //     Object.keys(res.body.data),
      //     ['id', 'project_id', 'user_id'],
      //     'update project and it users sucssfully',
      //   );
      //   t.end();
      // }
    });
});
test.onFinish(() => process.exit(0));
