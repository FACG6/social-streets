const test = require('tape');

const connection = require('../../database/config/connection');
const {
  buildDb,
  buildFakeData,
  buildStaticData,
} = require('../../database/config/build');
const selectUser = require('../../database/queries/selectUser');

const selectId = () => connection.query('SELECT id from "user" limit 1');

test('testing selectUser Query', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => selectId())
    .then(response => response.rows[0].id)
    .then(id => selectUser(id))
    .then((response) => {
      const user = response.rows[0];
      t.equal(typeof user, 'object', 'should be object');
      t.equal(Object.keys(user).length >= 11, true, 'should be equal to or more than 11 keys');
      t.equal(Object.keys(user).includes('first_name'), true, 'should be true');
      t.end();
    });
});
