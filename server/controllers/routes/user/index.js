const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');
const { updateBusiness } = require('./business');

router.route('/')
  .get(get)
  .post(post);

router.route('/business').put(updateBusiness);

module.exports = router;
