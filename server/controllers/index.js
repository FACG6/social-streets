const router = require('express').Router();

const { user } = require('./routes');


router.use(require('./middlewares/unlockCookie'));

router.use('/user', user);

module.exports = router;
