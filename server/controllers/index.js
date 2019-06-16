const router = require('express').Router();

const { post, user } = require('./routes');
const unlockCookie = require('./middlewares/unlockCookie');

router
  .use(unlockCookie);

router
  .use('/post', post);

router
  .use('/user', user);

module.exports = router;
