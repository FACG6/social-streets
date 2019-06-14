const tape = require('tape');

const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require('./../../database/config/build.js');
const {
  addTopic
} = require('../../database/queries/postEvent')

tape('insert topic for post (Event) ', (t) => {

  const event_id = 1;
  const topic_id= 2

  buildDb()
  .then(() => buildStaticData())
  .then(() => buildFakeData())
  .then(() => {
    addTopic(event_id, topic_id)
      .then((res) => {
        if (res.rowCount === 1) {
          t.deepEqual(
            Object.keys(res.rows[0]),
            [ 'event_id', 'topic_id' ],
            'New topic for (Event) added sucssfully'
          );
          t.equal(res.rows[0].event_id, 1, 'Same id for the event to add topic');
          t.end();
        } else {
          t.error();
        }
      })
      .catch((err) => {
        t.error(err);
      });
  });
});

tape.onFinish(() => process.exit(0));
