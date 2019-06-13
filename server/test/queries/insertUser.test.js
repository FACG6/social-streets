const tape = require('tape');
const insertUser = require('database/queries/insertUser');

tape('insert user query test', (t) => {
  const userInfo = {
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
  };

  insertUser(userInfo)
    .then((res) => {
      if (res.rowCount === 1) {
        t.equal(res.rows[0].avatar, 'avatar.png', 'add user successfully');
        t.end();
      } else {
        t.error();
      }
    })
    .catch((err) => {
      t.error(err);
    });
});

tape.onFinish(() => process.exit(0));
