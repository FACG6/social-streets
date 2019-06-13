const test = require('tape');

const { buildDb, buildStaticData, buildFakeData } = require('../../database/config/build');
const getUser = require('../../database/queries/getUser');

test('Testing getUser Query', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => getUser('ahmedisam9922@gmail.com'))
    .then((user) => {
      t.equal(typeof user, 'object', 'should be object');
      t.equal(Object.keys(user).length >= 11, true, 'should be equal to or more than 11 keys');
      t.equal(Object.keys(user).includes('first_name'), true, 'user must contain first_name');
      t.equal(user.first_name, 'Ahmed', 'First name must be Ahmed');
      t.equal(user.last_name, 'Abdellatif', 'Last name must be Abdellatif');
      t.equal(user.address, 'Omar Al-Mukhtar St.', 'Adress must be Omar Al-Mukhtar');
      t.end();
    });
});