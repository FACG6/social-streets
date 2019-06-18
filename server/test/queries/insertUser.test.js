const tape = require('tape');

const { insertUser } = require('./../../database/queries/insertUser');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

tape('insert user query test', (t) => {
  const userInfo = {
    first_name: 'amin',
    last_name: 'alakhsham',
    email: 'amin@gmail.com',
    password: 'aminamin',
    businessType: 'Business',
    website: 'https://www.socialstreets.com',
    organization: 'social-street',
    address: 'gaza strip',
    city: 'gaza',
    country: 'palestine',
    zipCode: '45214',
    facebook: 'https://fb.com/aminalakhsham',
    twitter: 'https://twitter.com/aminalakhsham',
    instagram: 'https://www.instagram.com/aminalakhsham',
  };
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      insertUser(userInfo)
        .then((res) => {
          if (res.rowCount === 1) {
            t.deepEqual(
              Object.keys(res.rows[0]),
              [
                'id',
                'first_name',
                'last_name',
                'email',
                'password',
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
              'add user in database sucssfully',
            );
            t.equal(res.rows[0].id, 4, 'id is four');
            t.end();
          } else {
            t.error();
          }
        })
        .catch((err) => {
          t.error(err);
        });
    })
    .catch(err => console.log(err));
});

tape.onFinish(() => process.exit(0));
