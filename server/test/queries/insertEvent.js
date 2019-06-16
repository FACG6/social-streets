const tape = require('tape');

const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require('./../../database/config/build.js');
const {
  addEvent
} = require('../../database/queries/postEvent')

tape('insert new post (Event) ', async (t) => {
  
  const eventData = {
    title: 'the main event',
    description: 'any desc',
    category: 1,
    event_datetime: '11/6/ 2019 - 04.30 p.m',
    venue: 'any street',
    website: 'www.gaza.com',
    cost: 12,
    imageName: 'images.pexels.com/photos/617278/pexels-photo',
    focus_key: 'any key',
    meta: 'this is meta',
    alt_text: 'alt for the image',
    is_draft: false,
    publisher_id: 1,
    publish_datetime: '11/6/ 2019 - 04.30 p.m'
  }
  
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const res = await addEvent(eventData)
    console.log(res)
    if (res.rowCount === 1) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        [ 'id', 'title', 'description', 'category', 'event_datetime', 'venue', 'website', 'cost', 'image', 'focus_key', 'meta', 'alt_text', 'is_draft', 'publisher_id', 'publish_datetime' ],
        'New Post (Event) added sucssfully'
      );
      t.equal(res.rows[0].id, 2, 'Same id for the new event');
      t.end();
    } else {
      t.error();
    }
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
