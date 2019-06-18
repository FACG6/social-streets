const tape = require('tape');

const { updatePasswordQuery } = require('./../../database/queries/updatePassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Query - Update User Password', (e) => {
  const password = '123456789';
  const id = 1;
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePasswordQuery(password, id)
        .then((result) => {
          if (result.rowCount === 1) {
            e.equal(result.rows[0].bool, true, 'Password Has Changed !!');
            e.end();
          } else {
            e.error();
          }
        });
    });
});

tape.onFinish(() => process.exit(0));
