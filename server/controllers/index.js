const router = require('express').Router();

const { user, post, login } = require('./routes');
const { post: userPost } = require('./routes/user/post');
const unlockCookie = require('./middlewares/unlockCookie');

router.post('/login', login);
router.post('/user', userPost);
router.use(unlockCookie);
router.use('/user', user);
router.use('/post', post);

module.exports = router;
