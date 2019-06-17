const router = require('express').Router();

const draftPosts = require('./getDraftPosts');
const post = require('./post');
const { get } = require('./get');
const put = require('./put');

router.route('/').post(post);

router.get('/draft', draftPosts);

router.post('/', post);
router
  .route('/:postId')
  .get(get)
  .put(put);

module.exports = router;
