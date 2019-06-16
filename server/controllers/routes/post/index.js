const router = require("express").Router();

const draftPosts = require('./getDraftPosts')
const post = require('./post');
const { get } = require("./get");

router
  .route('/')
  .get(draftPosts)
  .post(post);

router.get("/:postId", get);

module.exports = router;
