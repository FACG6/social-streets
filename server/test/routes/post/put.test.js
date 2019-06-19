const test = require('tape');
const supertest = require('supertest');
const app = require('../../../app');

const { buildDb, buildFakeData, buildStaticData } = require('../../../database/config/build');

test('update existing post at /api/v1/post/1', async (t) => {
  // build the testing database
  await buildDb();
  await buildStaticData();
  await buildFakeData();

  // test with valid data
  try {
    supertest(app)
      .put('/api/v1/post/1')
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYwODA5NDU5fQ.Uu-Xm-_rsx3NnatKObF2aH1wp_K67iPwBlOfxS-Q3cY',
      ])
      .field('type', 'event')
      .field('title', 'New Title 17/6/2019 - 9:45:33 AM.')
      .field('description', 'Lorem Lorem Lorem')
      .field('category', 1)
      .field('eventDatetime', '19/6/2019 - 04:00 p.m')
      .field('venue', 'gaza st')
      .field('website', 'www.qqqq.com')
      .field('altText', 'new alt text')
      .field('cost', 15)
      .field('isDraft', false)
      .field('focusKey', 'focusKeyword')
      .field('meta', 'this is meta description')
      .field('publishDatetime', '17/6/2019 - 09:30 p.m')
      .field('eventTopic', [1, 2, 3])
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) t.error(err);
        t.deepEqual(
          res.body,
          {
            data: {
              type: 'event',
              title: 'New Title 17/6/2019 - 9:45:33 AM.',
              description: 'Lorem Lorem Lorem',
              category: '1',
              eventDatetime: '19/6/2019 - 04:00 p.m',
              venue: 'gaza st',
              website: 'www.qqqq.com',
              altText: 'new alt text',
              cost: '15',
              isDraft: 'false',
              focusKey: 'focusKeyword',
              meta: 'this is meta description',
              publishDatetime: '17/6/2019 - 09:30 p.m',
              eventTopic: ['1', '2', '3'],
            },
            statusCode: 200,
          },
          'Excpect the server to responed with success',
        );
      });
  } catch (err) {
    t.error(err);
  }

  // test updating a post that does not belong to the current user
  try {
    supertest(app)
      .put('/api/v1/post/1')
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYwOTMzODQ3fQ.ZK_pYjeVol7e9_2kIFabNn0Q6uaXbHNAq54lSDhKdmY',
      ])
      .field('type', 'event')
      .field('title', 'New Title 17/6/2019 - 9:45:33 AM.')
      .field('description', 'Lorem Lorem Lorem')
      .field('category', 1)
      .field('eventDatetime', '19/6/2019 - 04:00 p.m')
      .field('venue', 'gaza st')
      .field('website', 'www.qqqq.com')
      .field('altText', 'new alt text')
      .field('cost', 15)
      .field('isDraft', false)
      .field('focusKey', 'focusKeyword')
      .field('meta', 'this is meta description')
      .field('publishDatetime', '17/6/2019 - 09:30 p.m')
      .field('eventTopic', [1, 2, 3])
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(401)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) t.error(err);
        t.deepEqual(
          res.body,
          { error: 'Unauthorized', statusCode: 401 },
          'Excpect the server to responed with 401 Unauthorized',
        );
      });
  } catch (err) {
    t.error(err);
  }

  // test with unvalid data
  try {
    supertest(app)
      .put('/api/v1/post/1')
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYwODA5NDU5fQ.Uu-Xm-_rsx3NnatKObF2aH1wp_K67iPwBlOfxS-Q3cY',
      ])
      .field('type', 'event')
      .field('title', 'New Title 17/6/2019 - 9:45:33 AM.')
      .field('description', 'Lorem Lorem Lorem')
      .field('category', 'ahmed')
      .field('eventDatetime', '19/6/2019 - 04:00 p.m')
      .field('venue', 'gaza st')
      .field('website', 'www.qqqq.com')
      .field('altText', 'new alt text')
      .field('cost', 15)
      .field('isDraft', false)
      .field('focusKey', 'focusKeyword')
      .field('meta', 'this is meta description')
      .field('publishDatetime', '17/6/2019 - 09:30 p.m')
      .field('eventTopic', [1, 2, 3])
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) t.error(err);
        t.deepEqual(
          res.body,
          { error: 'Bad Request', statusCode: 400 },
          'Excpect the server to responed with 400 Bad Request',
        );
      });
  } catch (err) {
    t.error(err);
  }

  // test with valid data
  try {
    supertest(app)
      .put('/api/v1/post/1')
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYwODA5ODM5fQ.TmwcbEeUxCLES1M4RIpF2nAY0oVt4vo8pL4dfHgbGJ0',
      ])
      .field('type', 'public_services')
      .field('title', 'Title new public_services title')
      .field('description', 'description for the public_services')
      .field('publishDatetime', '11/4/2019')
      .field('primaryTag', 1)
      .field('altText', 'desc fro img')
      .field('isDraft', false)
      .field('focusKey', 'focusKeyword')
      .field('meta', 'this is metaDescription')
      .field('secondaryTag', [1, 2])
      .attach('image', 'test/fakeImg/amideasblue.png')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) t.error(err);
        t.deepEqual(
          res.body,
          {
            data: {
              type: 'public_services',
              title: 'Title new public_services title',
              description: 'description for the public_services',
              publishDatetime: '11/4/2019',
              primaryTag: '1',
              altText: 'desc fro img',
              isDraft: 'false',
              focusKey: 'focusKeyword',
              meta: 'this is metaDescription',
              secondaryTag: ['1', '2'],
            },
            statusCode: 200,
          },
          'Excpect the server to responed with success',
        );
        t.end();
      });
  } catch (err) {
    t.error(err);
  }
});

test.onFinish(() => process.exit(0));
