const test = require('tape');
const request = require('supertest');
const app = require('../../../app');

const { buildDb, buildFakeData, buildStaticData } = require('../../../database/config/build');

test('Add new post at /api/v1/post/', async (t) => {
  await buildDb();
  await buildStaticData();
  await buildFakeData();
  try {
    const values = {
      'type': 'event',
      'title': 'Title from',
      'description': 'description for the event',
      'category': 1,
      'eventDatetime': '11/4/2019 - 02.23 p.m',
      'venue': 'gaza st',
      'website': 'www.qqqq.com',
      'altText': 'desc fro img',
      'cost': 15,
      'isDraft': false,
      'focusKey': 'focusKeyword',
      'meta': 'this is metaDescription',
      'publishDatetime': '11/4/2019',
      'eventTopic': [1, 2]
    }
    request(app)
      .post('/api/v1/post/')
<<<<<<< HEAD
      .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
      .field('data', JSON.stringify(values))
=======
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
      ])
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
>>>>>>> 64dac26203770404e362ebe9686bd47ee2bbcbfb
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else {
<<<<<<< HEAD
          const data = res.body.data
          t.deepEqual(Object.keys(data), ['id', 'title', 'description', 'category', 'event_datetime', 'venue', 'website', 'cost', 'image', 'focus_key', 'meta', 'alt_text', 'is_draft', 'publisher_id', 'publish_datetime'], 'Event add sucssfully')
          t.equal(res.body.data.id, 3, 'Same id for the new Event Post')
=======
          t.deepEqual(
            Object.keys(res.body.data),
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
            ],
            'Event add sucssfully',
          );
          t.equal(res.body.data.id, 3, 'Same id for the new Event Post');
>>>>>>> 64dac26203770404e362ebe9686bd47ee2bbcbfb
          t.end();
        }
      });
  } catch (err) {
    t.error(err);
  }
});

test('Add new post at /api/v1/post/', async (t) => {
  await buildDb();
  await buildStaticData();
  await buildFakeData();
  try {
    const values = {
      'type': 'public_services',
      'primaryTag': 1,
      'description': 'description for the public_services',
      'focusKey': 'focusKeyword',
      'altText': 'desc fro img',
      'meta': 'this is metaDescription',
      'publishDatetime': '11/4/2019',
      'title': 'Title public_services',
      'isDraft': false,
      'secondaryTag': [1, 2, 3],
    }
    request(app)
      .post('/api/v1/post/')
<<<<<<< HEAD
      .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM'])
      .field('data', JSON.stringify(values))
=======
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwNDE5NDE2fQ.MCP5Rx0eu31Hjyb2gL9YXd9n5w7SHTwOMjjHNNgeovM',
      ])
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
>>>>>>> 64dac26203770404e362ebe9686bd47ee2bbcbfb
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          t.error(err);
        } else {
          t.deepEqual(
            Object.keys(res.body.data),
            [
              'id',
              'primary_tag',
              'description',
              'image',
              'focus_key',
              'alt_text',
              'meta',
              'publisher_id',
              'publish_datetime',
              'title',
              'is_draft',
            ],
            'Public Services added sucssfully',
          );
          t.equal(res.body.data.id, 2, 'Same id for the new Public Services Post');
          t.end();
        }
      });
  } catch (err) {
    t.error(err);
  }
});

test.onFinish(() => process.exit(0));