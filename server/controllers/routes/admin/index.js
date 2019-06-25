const router = require('express').Router();
const getPosts = require('./getPosts');
const getTips = require('./getTips');
const authAdmin = require('../../middlewares/authAdmin');

router.use(authAdmin);
router.get('/posts', getPosts).put('/posts', getTips);

module.exports = router;
