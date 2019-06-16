const router = require('express').Router();

const { user } = require('./routes');
const unlockedCookie = require('./middlewares/unlockCookie');


router.use(unlockedCookie);

router.use('/user', user);

module.exports = router;
