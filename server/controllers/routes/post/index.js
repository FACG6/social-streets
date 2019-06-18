const router = require("express").Router();

<<<<<<< HEAD
const draftPosts = require('./getDraftPosts');
const livePosts = require('./getLivePosts')
=======
const deletePost = require('./delete');
const draftPosts = require('./getDraftPosts')
>>>>>>> fcf2d772f0354543cb94e7dce316cffd3738ba6e
const post = require('./post');
const {
  get
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
