const tape = require('tape');

const { getPassword } = require('./../../database/queries/getPassword');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('get password', (e) => {
  const id = [1];
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      getPassword(id)
        .then((result) => {
          if (result.rowCount === 1) {
            e.deepEqual(result.rowCount, 1, 'get password');
            e.end();
          } else {
            e.error();
          }
        });
    });
});

tape.onFinish(() => process.exit(0));
