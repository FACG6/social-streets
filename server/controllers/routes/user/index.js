const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');

router.route('*')
  .get(get)
  .post(post);

module.exports = router;
