const tape = require('tape');

const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require('./../../database/config/build.js');
const {
  addSecondaryTag
} = require('../../database/queries/postEvent')

tape('insert secondary_tag for post (public services) ', async (t) => {

  const public_services_id = 1;
  const secondary_tag= 2
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const res = await addSecondaryTag(public_services_id, secondary_tag)
    if (res.rowCount === 1) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        [ 'secondary_tag', 'public_service_id' ],
        'New secondary_tag for (Public Serves) added sucssfully'
      );
      t.equal(res.rows[0].public_service_id, 1, 'Same id for the Public Serves to add secondary_tag');
      t.end();
    } else {
      t.error();
    }
  } catch (ree) { 
    t.error(err)
  }
});

tape.onFinish(() => process.exit(0));
