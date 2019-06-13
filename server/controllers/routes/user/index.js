const router = require('express').Router();

const { getUser } = require('./get');

router.route('/')
  .get(getUser);
