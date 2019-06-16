const tape = require('tape');

tape('test', (e) => {
  e.equal(1, 1, 'pass');
  e.end();
});

require('./queries/getPassword.test');
require('./queries/updatePassword.test');
require('./routes/passwordPut.test');
