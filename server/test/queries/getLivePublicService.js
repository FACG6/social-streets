const tape = require('tape');

const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');
const { getPublicServices } = require('../../database/queries/getPosts');

const livePosts = [{ id: 1, primary_tag: 2, title: 'News Title' }];

tape('Get Live Public Services | Query', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const publisherId = 3;
    const res = await getPublicServices('false', publisherId)
    t.equal(res.rows.length, 1, 'length is 1')
    t.deepEqual(Object.keys(res.rows[0]), ['id', 'primary_tag', 'title'], 'should include id, primary tag and title');
    t.deepEqual(res.rows, livePosts, 'should be equal');
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape('Get Live Public Services | Query', async (t) => {
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const publisherId = 2;
    const res = await getPublicServices('false', publisherId)
    t.equal(res.rowCount, 0, 'No posts')
    t.end();
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
