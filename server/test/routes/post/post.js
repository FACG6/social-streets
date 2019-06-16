const test = require('tape');
const request = require('supertest');
const app = require('../../../app');

const {
  buildDb,
  buildFakeData,
  buildStaticData
} = require('../../../database/config/build');

test('Add new post at /api/v1/post/', async (t) => {
  await buildDb()
  await buildStaticData()
  await buildFakeData()
  try {
    request(app)
      .post('/api/v1/post')
      .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
      .field('type', 'event')
      .field('title', 'Title from')
      .field('description', 'description for the event')
      .field('category', 1)
      .field('eventDatetime', '11/4/2019 - 02.23 p.m')
      .field('venue', 'gaza st')
      .field('website', 'www.qqqq.com')
      .field('altText', 'desc fro img')
      .field('cost', 15)
      .field('isDraft', false)
      .field('focusKey', 'focusKeyword')
      .field('meta', 'this is metaDescription')
      .field('publishDatetime', '11/4/2019')
      .field('eventTopic', [1, 2])
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else {
          t.deepEqual(Object.keys(res.body.data), ['id', 'title', 'description', 'category', 'event_datetime', 'venue', 'website', 'cost', 'image', 'focus_key', 'meta', 'alt_text', 'is_draft', 'publisher_id', 'publish_datetime'], 'Event add sucssfully')
          t.equal(res.body.data.id, 2, 'Same id for the new Event Post')
          t.end();
        }
      });
  } catch (err) {
    console.log(err)
    t.error(err)
  }
});

test('Add new post at /api/v1/post/', async (t) => {
  await buildDb()
  await buildStaticData()
  await buildFakeData()
  try {
    request(app)
      .post('/api/v1/post/')
      .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
      .field('type', 'public_services')
      .field('primaryTag', 1)
      .field('description', 'description for the public_services')
      .field('focusKey', 'focusKeyword')
      .field('altText', 'desc fro img')
      .field('meta', 'this is metaDescription')
      .field('publishDatetime', '11/4/2019')
      .field('title', 'Title public_services')
      .field('isDraft', false)
      .field('secondaryTag', [1, 2, 3])
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else {
          t.deepEqual(Object.keys(res.body.data), ['id', 'primary_tag', 'description', 'image', 'focus_key', 'alt_text', 'meta', 'publisher_id', 'publish_datetime', 'title', 'is_draft', ], 'Public Services added sucssfully')
          t.equal(res.body.data.id, 2, 'Same id for the new Public Services Post')
          t.end();
        }
      });
  } catch (err) {
    t.error(err)
  }
});

test.onFinish(() => process.exit(0));
