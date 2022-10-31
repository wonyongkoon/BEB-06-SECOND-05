const router=require("express").Router();
const controller=require("../controllers/post.controller");

router.post("/postall",controller.findAllPosts);
router.post("/postsave",controller.postsave);

module.exports=router;