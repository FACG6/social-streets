const router = require("express").Router();

const draftPosts = require('./getDraftPosts')
const post = require('./post');
const {
  get
} = require("./get");

router
  .route('/')
  .post(post);

router
  .route('/draft')
  .get(draftPosts);

router.get("/:postId", get);

module.exports = router;
