const router = require('express').Router();

const { user, post } = require('./routes');
const { post: userPost } = require('./routes/user/post');
const unlockedCookie = require('./middlewares/unlockCookie');

router.post('/user',userPost);
router.use(unlockedCookie);
router.use('/user', user);
router.use('/posts', post);
router.use('/post', post);

module.exports = router;
