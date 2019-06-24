const router = require('express').Router();
const getPosts = require('./getPosts');
const authAdmin = require('../../middlewares/authAdmin');


router.use(authAdmin);
router.get('/posts', getPosts);

module.exports = router;