const test = require('tape');

const connection = require('../../database/config/connection');
const { deleteEvent, deletePublicService } = require('./../../database/queries/deletePost');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build.js');

const eventId = () => connection.query('SELECT id from event limit 1');

test('testing delete Event Query', (t) => {
  buildDb()
    .then(buildStaticData)
    .then(buildFakeData)
    .then(eventId)
    .then(id => deleteEvent(id.rows[0].id))
    .then((response) => {
      t.equal(Object.keys(response.rows[0]).length, 15, 'should be 15 keys');
      t.equal(Object.keys(response.rows[0]).includes('id'), true, 'should include id of event');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});

test('testing delete public service Query', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => eventId())
    .then(id => deletePublicService(id.rows[0].id))
    .then((response) => {
      const keys = ['id', 'primary_tag', 'description', 'image', 'focus_key', 'alt_text', 'meta', 'publisher_id', 'publish_datetime', 'title', 'is_draft']
      t.equal(Object.keys(response.rows[0]).length, 11, 'should be 11 keys');
      t.equal(Object.keys(response.rows[0]).includes('id'), true, 'should include id of event');
      t.deepEqual(Object.keys(response.rows[0]), keys, 'should be equal');
      t.end();
    })
    .catch((error) => {
      t.error(error);
    });
});
