const router = require('express').Router();

const { get } = require('./get');
const unlockedCookie = require('./../../middlewares/unlockCookie');

router.use(unlockedCookie);
router.route('/:postId').get(get);

module.exports = router;
