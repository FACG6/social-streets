const router = require('express').Router();

const { post, user } = require('./routes');
const unlockedCookie = require('./middlewares/unlockCookie');

router
  .use(unlockedCookie);

router
  .use('/post', post);

router
  .use('/user', user);

module.exports = router;
