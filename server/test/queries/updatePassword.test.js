const tape = require('tape');

const { updatePasswordQuery } = require('./../../database/queries/updatePassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Update user password', (e) => {
  const email = 'aminking@gmail.com';
  const password = '123456';
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePasswordQuery(email, password)
        .then((result) => {
          if (result.rowCount === 1) {
            e.deepEqual(result.rows[0].bool, true, 'Password Has Changed !!');
            e.end();
          } else {
            e.error();
          }
        });
    });
});

tape.onFinish(() => process.exit(0));
