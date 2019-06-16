const router = require('express').Router();

const draftPosts = require('./getDraftPosts')
const post = require('./post');

router
  .route('/')
  .get(draftPosts)
  .post(post);

module.exports = router;
