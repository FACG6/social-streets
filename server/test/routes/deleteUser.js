const test = require('tape');
const request = require('supertest');

const app = require('../../../server/app');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');


test('post in /api/v1/posts/event/1', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .delete('/api/v1/posts/event/1')
        .expect(200)
        .end((error, response) => {
          t.equal(Object.keys(response.body.data).length, 15, 'should be 15 keys');
          t.equal(Object.keys(response.body.data).includes('id'), true, 'should include id of event');
          t.end();
        });
    })
    .catch(err => t.error(err));
});

test('post in /api/v1/posts/public-service/1', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
      request(app)
        .delete('/api/v1/posts/public-service/1')
        .expect(200)
        .end((error, response) => {
          const keys = ['id', 'primary_tag', 'description', 'image', 'focus_key', 'alt_text', 'meta', 'publisher_id', 'publish_datetime', 'title', 'is_draft'];
          t.equal(Object.keys(response.body.data).length, 11, 'should be 11 keys');
          t.equal(Object.keys(response.body.data).includes('id'), true, 'should include id of public service');
          t.deepEqual(Object.keys(response.body.data), keys, 'should be equal');
          t.end();
        });
    })
    .catch(err => t.error(err));
});


test.onFinish(() => process.exit(0));
