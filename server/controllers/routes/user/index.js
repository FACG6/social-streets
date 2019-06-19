const router = require('express').Router();

const { get } = require('./get');
const { post } = require('./post');
const { updateBusiness } = require('./business');
const { updatePassword } = require('./password');

router
  .route('/')
  .get(get)
  .post(post);
router
  .route('/password')
  .put(updatePassword);
router
  .route('/business')
  .put(updateBusiness);

module.exports = router;
