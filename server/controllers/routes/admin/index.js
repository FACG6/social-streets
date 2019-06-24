const router = require('express').Router();

const getAllUsers = require('./getAllUsers');
const deleteUser = require('./deleteUser');

router.get('/all-users', getAllUsers);
router.delete('/delete-user/:userId', deleteUser);

module.exports = router;
