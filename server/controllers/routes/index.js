const router = require('express').Router();

const user = require('./user');
const post = require('./post');

router.use(user);

module.exports = { post, user };
