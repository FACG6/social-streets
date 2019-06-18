const router = require("express").Router();

const deletePost = require('./delete');
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

router.route('/:postId')
  .get(get)
  .delete(deletePost)

module.exports = router;
