const tape = require('tape');

const { updatePersonalDataQuery } = require('./../../database/queries/updatePersonalData');
const { buildDb, buildFakeData, buildStaticData } = require('./../../database/config/build');

tape('Update user personal data', (e) => {
  const user_id = 1;
  const first_name = 'aaaa';
  const last_name = 'bbb';
  const email = 'aaa@bbb.com';
  const avatar = 'https://cdn.pixabay.com/photo/2016/03/09/16/50/lake-1246865_960_720.jpg';
  buildDb()
    .then(() => buildStaticData())
    .then(() => buildFakeData())
    .then(() => {
        updatePersonalDataQuery(first_name, last_name, email, avatar, user_id)
        .then((result) => {
          console.log("testtttt");
        //   if (result.rowCount === 1) {
        //     e.equal(result.rows[0].bool, true, 'Password Has Changed !!');
        //     e.end();
        //   } else {
        //     e.error();
        //   }
        });
    });
});

tape.onFinish(() => process.exit(0)); 
