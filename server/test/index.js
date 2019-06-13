const tape = require('tape');
const { updatePasswordQuery } = require('./../database/queries/updatePassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../database/config/build');

tape('test', (e) => {
  e.equal(1, 1, 'pass');
  e.end();
});


tape('Update user password', (e) => {
  const email = 'ahmedisam9922@gmail.com';
  const password = '123456';
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePasswordQuery(email, password)
        .then((result) => {
          console.log(result);
        });
    });
  e.end();
});
