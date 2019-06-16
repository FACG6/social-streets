const router = require("express").Router();

const unlockedCookie = require("./../../middlewares/unlockCookie");
const draftPosts = require('./getDraftPosts')
const post = require('./post');
const { get } = require("./get");

router
  .route('/')
  .get(draftPosts)
  .post(post);

router.use(unlockedCookie);

router.get("/:postId", get);

module.exports = router;
