const router = require('express').Router();

const { user, post } = require('./routes');
const unlockCookie = require('./middlewares/unlockCookie');

router
  .use(unlockCookie)

router
  .use('/user', user);

router
  .use('/posts', post);

router
  .use('/post', post)

module.exports = router;
