const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');
const { updatePassword } = require('./password');

router
  .route('/')
  .get(get)
  .post(post);
router
  .put('/password', updatePassword);

module.exports = router;
