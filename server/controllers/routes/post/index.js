const router = require("express").Router();

const draftPosts = require('./getDraftPosts');
const livePosts = require('./getLivePosts');
const deletePost = require('./delete');
const post = require('./post');
const {
  get,
} = require("./get");

router
  .route('/')
  .post(post);

router
  .get('/draft', draftPosts);

router
  .get('/live', livePosts);

router.route('/:postId')
  .get(get)
  .delete(deletePost)

module.exports = router;
