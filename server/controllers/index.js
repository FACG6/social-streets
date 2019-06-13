const router = require('express').Router();

const { login } = require('./routes');

router.post('/login', login);

module.exports = router;
