const tape = require('tape');

const { getPassword } = require('./../../database/queries/getPassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Query - Get User Password', (e) => {
  const id = 1;
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      getPassword(id)
        .then((result) => {
          if (result.rowCount === 1) {
            e.deepEqual(result.rowCount, 1, 'Password Has Gotten');
            e.end();
          } else {
            e.error();
          }
        });
    });
});

tape.onFinish(() => process.exit(0));
