const tape = require('tape');

tape('test', (e) => {
  e.equal(1, 1, 'pass');
  e.end();
});

require('./queries/getPassword.test');
require('./queries/insertEvent');
require('./queries/insertPublicServices');
require('./queries/insertSecondaryTag');
require('./queries/insertTopic');
require('./queries/insertUser.test');
require('./queries/updatePassword.test');
require('./routes/passwordPut.test');
require('./routes/post/post');
