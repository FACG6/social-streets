const test = require('tape');

const { buildDb, buildStaticData, buildFakeData } = require('../../database/config/build');
const getUser = require('../../database/queries/getUser');

test('testing selectUser Query', (t) => {
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => getUser('ahmedisam9922@gmail.com'))
    .then((res) => {
      const user = res.rows[0];
      t.equal(typeof user, 'object', 'should be object');
      t.equal(Object.keys(user).length >= 11, true, 'should be equal to or more than 11 keys');
      t.equal(Object.keys(user).includes('first_name'), true, 'should be true');
      t.equal(user.first_name, 'Ahmed', 'First name must be Ahmed');
      t.equal(user.last_name, 'Abdellatif', 'Last name must be Abdellatif');
      t.equal(user.address, 'Omar Al-Mukhtar', 'Adress must be Omar Al-Mukhtar');
      t.end();
    });
});
