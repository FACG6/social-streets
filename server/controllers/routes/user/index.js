const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');

router.route('/')
  .get(get)
  .post(post);

const { updatePersonal } = require('./personal');

router.route('/personal').put(updatePersonal);

module.exports = router;
