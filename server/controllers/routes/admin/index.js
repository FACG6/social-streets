const router = require('express').Router();

const getAllUsers = require('./getAllUsers');
const deleteUser = require('./deleteUser');
const getPosts = require('./getPosts');
const authAdmin = require('../../middlewares/authAdmin');

router.use(authAdmin);
router.get('/all-users', getAllUsers);
router.delete('/delete-user/:userId', deleteUser);
router.get('/posts', getPosts);

module.exports = router;
