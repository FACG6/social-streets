const router = require('express').Router();

const { deleteEvent, deletePublicService } = require('./delete');

router.route('/event/:postId')
  .delete(deleteEvent);

router.route('/public-service/:postId')
  .delete(deletePublicService);

module.exports = router;
