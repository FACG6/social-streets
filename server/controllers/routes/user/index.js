const router = require('express').Router();

const { post } = require('./post');

router.route('/').post(post);

module.exports = router;
