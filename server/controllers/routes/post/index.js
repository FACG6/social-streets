const router = require('express').Router();

const addPost = require('./post');

router
  .route('/')
  .post(addPost);

module.exports = router;
