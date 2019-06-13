const router = require('express').Router();

const { post } = require('./routes')

router
  .use('/post', post)

module.exports = router;
