const router = require('express').Router();

const { deleteEvent, deletePublicService } = require('./delete');
const addPost = require('./post');

router
  .route('/')
  .post(addPost);

router.route('/event/:postId')
  .delete(deleteEvent);

router.route('/public-service/:postId')
  .delete(deletePublicService);


module.exports = router;
