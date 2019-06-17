const router = require("express").Router();

const { deleteEvent, deletePublicService } = require('./delete');
const draftPosts = require('./getDraftPosts')
const post = require('./post');
const {
  get
} = require("./get");

router
  .route('/')
  .post(post);

router.route('/event/:postId')
  .delete(deleteEvent);

router.route('/public-service/:postId')
  .delete(deletePublicService);

router
  .route('/draft')
  .get(draftPosts);

router.get("/:postId", get);

module.exports = router;
