const router = require('express').Router();

const login = require('./routes/login');

router.post('/login', login);

module.exports = router;
