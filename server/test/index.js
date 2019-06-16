const tape = require('tape');

tape('test', (e) => {
  e.equal(1, 1, 'pass');
  e.end();
});