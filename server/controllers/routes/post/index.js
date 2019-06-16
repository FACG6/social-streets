const router = require('express').Router();

const { get } = require('./get');
const addPost = require('./addPost');
const unlockedCookie = require('./../../middlewares/unlockCookie');

router.use(unlockedCookie);
router.route('/:postId').get(get);

router
  .route('/')
  .post(addPost);

module.exports = router;
