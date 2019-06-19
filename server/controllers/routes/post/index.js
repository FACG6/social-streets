const router = require('express').Router();

const draftPosts = require('./getDraftPosts');
const put = require('./put');
const livePosts = require('./getLivePosts');
const deletePost = require('./delete');
const post = require('./post');
const { get } = require('./get');
const eventStatic = require('./eventStatic');
const publicServiceStatic = require('./publicServiceStatic');

router.post('/', post);

router.get('/draft', draftPosts);

router.get('/live', livePosts);

router
  .route('/:postId')
  .get(get)
  .put(put)
  .delete(deletePost);

router.get('/event/static', eventStatic);

router.get('/public-service/static', publicServiceStatic);

module.exports = router;
