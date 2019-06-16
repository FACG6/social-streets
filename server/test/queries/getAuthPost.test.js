const tape = require('tape');

const { getAuthPost } = require('../../database/queries/getAuthPosts');
const { buildDb, buildFakeData, buildStaticData } = require('../../database/config/build.js');

tape('get event post query test', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      getAuthPost('event', 1, 2)
        .then((res) => {
          if (res.rowCount === 1) {
            t.deepEqual(
              Object.keys(res.rows[0]),
              ['publisher_id'],
              'get event from database sucssfully',
            );
            t.equal(res.rows[0].publisher_id, 2, 'id is one');
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
