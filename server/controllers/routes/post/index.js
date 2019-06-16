const router = require('express').Router();

const { deleteEvent, deletePublicService } = require('./delete');
const draftPosts = require('./getDraftPosts')
const post = require('./post');

router
  .route('/')
  .post(post);

router.route('/draft')
  .get(draftPosts);

router.route('/event/:postId')
  .delete(deleteEvent);

router.route('/public-service/:postId')
  .delete(deletePublicService);


module.exports = router;
