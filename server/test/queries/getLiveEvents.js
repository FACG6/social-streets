const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { getEvents } = require('../../database/queries/getPosts');

tape('Get Live Events | Query', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const publisherId = 3;
    const res = await getEvents('false', publisherId)
    t.equal(res.rowCount, 0, 'No posts')
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape('Get Live Events | Query', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const publisherId = 2;
    const res = await getEvents('false', publisherId)
    t.equal(res.rows.length, 1, 'length is 1')
    t.deepEqual(Object.keys(res.rows[0]), ['id', 'category', 'title'], 'should include id, catetory, and title');
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
