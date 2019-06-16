const router = require('express').Router();

const { post } = require('./post');

const { updatePassword } = require('./password');


router.route('*').post(post);
router.route('/password').put(updatePassword);
module.exports = router;
