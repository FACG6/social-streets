const router = require('express').Router();

const addPost = require('./addPost');
const draftPosts = require('./getDraftPosts')

router
  .route('/')
  .get(draftPosts)
  .post(addPost);

module.exports = router;
