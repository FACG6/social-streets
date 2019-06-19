const router = require('express').Router();

const draftPosts = require('./getDraftPosts');
const livePosts = require('./getLivePosts');
const deletePost = require('./delete');
const post = require('./post');
const { get } = require('./get');
const eventStatic = require('./eventStatic');
const publicServiceStatic = require('./publicServiceStatic');

router.route('/').post(post);

router.get('/draft', draftPosts);

router.get('/live', livePosts);

router
  .route('/:postId')
  .get(get)
  .delete(deletePost);

router.get('/event/static', eventStatic);

router.get('/public-service/static', publicServiceStatic);

module.exports = router;
