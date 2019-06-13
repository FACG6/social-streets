const tape = require('tape');

const { updatePasswordQuery } = require('../../database/queries/updatePassword');
const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build');

tape('Update user password', (t) => {
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
});
