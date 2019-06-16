const router = require('express').Router();

const addPost = require('./addPost');

router
  .route('/')
  .post(addPost);

module.exports = router;
