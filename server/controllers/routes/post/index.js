const router = require("express").Router();

const draftPosts = require("./getDraftPosts");
const post = require("./post");
const { get } = require("./get");

router.route("/").post(post);

router.get("/draft", draftPosts);

router.post("/", post);
router.get("/:postId", get);
router.put("/:postId", put);

module.exports = router;
