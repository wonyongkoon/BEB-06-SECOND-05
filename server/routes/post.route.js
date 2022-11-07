const router=require("express").Router();
const controller=require("../controllers/post.controller");

router.post("/postall",controller.findAllPosts);
router.post("/postsave",controller.postsave);
router.post("/comment",controller.findcomment);
router.post("/commentsave",controller.commentsave);

module.exports=router;