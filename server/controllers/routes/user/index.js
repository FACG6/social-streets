const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');
const { updatePassword } = require('./password');

router.route('/password').put(updatePassword);
router.route('/')
  .get(get)
  .post(post);

module.exports = router;
