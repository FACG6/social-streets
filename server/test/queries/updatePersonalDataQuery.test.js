const tape = require('tape');

const { updatePersonalDataQuery } = require('./../../database/queries/updatePersonalData');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Query - Update User Personal Data', (e) => {
  const userId = 1;
  const firstName = 'Khader';
  const lastName = 'Murtaja';
  const email = 'aaa@bbb.com';
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      updatePersonalDataQuery(firstName, lastName, email, userId)
        .then((result) => {
          if (result.rowCount === 1) {
            e.equal(result.rows[0].bool, true, 'Personal Data Have Updated in Database !!');
            e.end();
          } else {
            e.error();
          }
        });
    });
});

tape.onFinish(() => process.exit(0));
