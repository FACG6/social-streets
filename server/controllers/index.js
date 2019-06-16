const router = require('express').Router();

const { user, post } = require('./routes');

router.use('/user', user);
router.use('/post', post);

module.exports = router;
