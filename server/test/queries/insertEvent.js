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
    eventDatetime: '11/6/ 2019 - 04.30 p.m',
    venue: 'any street',
    website: 'www.gaza.com',
    cost: 12,
    imageName: 'images.pexels.com/photos/617278/pexels-photo',
    focusKey: 'any key',
    meta: 'this is meta',
    altText: 'alt for the image',
    isDraft: false,
    publisherId: 1,
    publishDatetime: '11/6/ 2019 - 04.30 p.m'
  }
  
  try {
    await buildDb()
    await buildStaticData()
    await buildFakeData()
    const res = await addEvent(eventData)
    if (res.rowCount === 1) {
      t.deepEqual(
        Object.keys(res.rows[0]),
        [ 'id', 'title', 'description', 'category', 'event_datetime', 'venue', 'website', 'cost', 'image', 'focus_key', 'meta', 'alt_text', 'is_draft', 'publisher_id', 'publish_datetime' ],
        'New Post (Event) added sucssfully'
      );
      t.equal(res.rows[0].id, 3, 'Same id for the new event');
      t.end();
    } else {
      t.error();
    }
  } catch (err) {
    t.error(err);
  }
});

tape.onFinish(() => process.exit(0));
