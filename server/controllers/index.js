const router = require('express').Router();

const { post } = require('./routes');
const unlockedCookie = require('./middlewares/unlockCookie');

router
  .use(unlockedCookie)

router
  .use('/post', post)

module.exports = router;
