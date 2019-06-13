const router = require('express').Router();

const authentication = require('../controllers/middlewares/unlockCookie');
const user = require('../controllers/routes/user');

router.use(authentication);
router.use('/user', user);

module.exports = router;
