const router = require('express').Router();

const post = require('./posts/addPost');
console.log(post('qq'))

router
  .use('/post', post);

module.exports = router;
