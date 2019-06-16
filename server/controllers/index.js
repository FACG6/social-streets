const router = require('express').Router();

const { user } = require('./routes');
const authentication = require('../controllers/middlewares/unlockCookie');

router.use(authentication);
router.use('/user', user);

module.exports = router;
