const router = require('express').Router();

const { get } = require('./get');
const post = require('./post');
const put = require('./put');
const unlockedCookie = require('./../../middlewares/unlockCookie');

router.use(unlockedCookie);

router.post('/', post);
router.get('/:postId', get);
router.put('/:postId', put);

module.exports = router;
