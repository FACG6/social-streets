const router = require('express').Router();

const { user, post, login } = require('./routes');
const { post: userPost } = require('./routes/user/post');
const unlockCookie = require('./middlewares/unlockCookie');
const logout = require('./routes/logout');
const isAuth = require('./routes/isAuth');
const { admin } = require('./routes');

router.post('/login', login);
router.post('/user', userPost);
router.use(unlockCookie);
router.use('/user', user);
router.use('/post', post);
router.get('/isAuth', isAuth);
router.get('/logout', logout);
router.use('/admin', admin);

module.exports = router;
