const tape = require('tape');

const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require('./../../database/config/build.js');
const {
  addPublicServices
} = require('../../database/queries/postEvent')

tape('insert new post (Public Services) ', (t) => {

  const publicServicesData = {
    title: 'the main Public Services',
    description: 'any desc',
    primary_tag: 1,
    image: 'images.pexels.com/photos/617278/pexels-photo',
    focus_key: 'any key',
    meta: 'this is meta',
    alt_text: 'alt for the image',
    is_draft: false,
    publisher_id: 1,
    publish_datetime: '11/6/ 2019 - 04.30 p.m'
  }

  buildDb()
  .then(() => buildStaticData())
  .then(() => buildFakeData())
  .then(() => {
    addPublicServices(publicServicesData)
      .then((res) => {
        if (res.rowCount === 1) {
          t.deepEqual(
            Object.keys(res.rows[0]),
            [ 'id', 'primary_tag', 'description', 'image', 'focus_key', 'alt_text', 'meta', 'publisher_id', 'publish_datetime', 'title', 'is_draft' ],
            'New Post (Event) added sucssfully'
          );
          t.equal(res.rows[0].id, 2, 'Same id for the new event');
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
