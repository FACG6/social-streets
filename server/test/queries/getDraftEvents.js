const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { getDraftEvents } = require('../../database/queries/getDraftPosts');

tape('Get draft Events', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const publisherId = 2;
    const res = await getDraftEvents(publisherId, true)
    if (res.rowCount !== 0) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        [ 'id', 'category' ],
        'Get all draft events'
      );  
      t.equal(res.rows[0].id, 1, 'Same id for the event');
      t.end();
    } else {
      t.equal(res.rowCount, 0, 'No draft event in the database')
      t.end();
    }  
  } catch (err) {
    t.error(err);
  }  
});

tape.onFinish(() => process.exit(0));
