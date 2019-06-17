const test = require('tape');

const {
  buildDb,
  buildFakeData,
  buildStaticData,
} = require('../../database/config/build');
const selectUser = require('../../database/queries/selectUser');

const user = {
  id: 2,
  first_name: 'Amin',
  last_name: 'Al-Akhsam',
  email: 'aminking@gmail.com',
  password:
    '$2y$12$0tqIpfxzTSFIKFECzjS1XOKhhxAlPsexglTCOKhysSXVt.R4KTBAW',
  business_type: 'Community organisation',
  website: 'https://www.google.com',
  organisation_name: 'Amin Co.',
  address: 'Omar Al-Mukhtar St.',
  city: 'Gaza',
  country: 'Palestine',
  zip_code: '79702',
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com',
  twitter: 'https://www.twitter.com',
  avatar: null
};

test('testing selectUser Query', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => selectUser(2))
    .then((response) => {
      const resUser = response.rows[0];
      t.equal(typeof user, 'object', 'should be object');
      t.equal(Object.keys(user).length >= 11, true, 'should be equal to or more than 11 keys');
      t.deepEqual(resUser, user, 'should be true');
      t.end();
    });
});
