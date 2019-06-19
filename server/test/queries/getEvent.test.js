const tape = require('tape');

const { getEvent } = require('./../../database/queries/getPost');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

tape('get event post query test', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(() => {
      getEvent(1, 2)
        .then((res) => {
          if (res.rowCount === 4) {
            t.deepEqual(
              Object.keys(res.rows[0]),
              [
                'id',
                'title',
                'description',
                'category',
                'event_datetime',
                'venue',
                'website',
                'cost',
                'image',
                'focus_key',
                'meta',
                'alt_text',
                'is_draft',
                'publisher_id',
                'publish_datetime',
                'event_id',
                'topic_id',
                'topic',
              ],
              'get event from database sucssfully',
            );
            t.equal(res.rows[0].id, 1, 'id is one');
            t.end();
          } else {
            t.error();
          }
        })
        .catch((err) => {
          t.error(err);
        });
    })
    .catch(err => t.error(err));
});

tape.onFinish(() => process.exit(0));
