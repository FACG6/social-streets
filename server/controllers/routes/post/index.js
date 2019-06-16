const router = require("express").Router();

const { get } = require("./get");
const addPost = require("./post");
const unlockedCookie = require("./../../middlewares/unlockCookie");

router.use(unlockedCookie);

router.post("/", addPost);
router.get("/:postId", get);

module.exports = router;
