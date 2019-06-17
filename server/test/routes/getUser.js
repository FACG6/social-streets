const request = require('supertest');
const test = require('tape');

const app = require('../../app');
const {
  buildDb,
  buildStaticData,
  buildFakeData,
} = require('../../database/config/build');

const user = {
  id: 1,
  first_name: 'Ahmed',
  last_name: 'Abdellatif',
  email: 'ahmedisam9922@gmail.com',
  business_type: 'Charity',
  website: 'https://www.google.com',
  organisation_name: 'Ahmed Co.',
  address: 'Omar Al-Mukhtar St.',
  city: 'Gaza',
  country: 'Palestine',
  zip_code: '79702',
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com',
  twitter: 'https://www.twitter.com',
  avatar: null
}

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
          const resUser = response.body.data;
          t.equal(typeof user, 'object', 'should be object');
          t.equal(Object.keys(user).length >= 11, true, 'should be equal to or more than 11 keys');
          t.deepEqual(resUser, user, 'should be true');
          t.end();
        });
    });
});
