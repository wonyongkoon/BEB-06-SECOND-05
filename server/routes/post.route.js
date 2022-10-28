const router=require("express").Router();
const controller=require("../controllers/post.controller");

router.post("/postall",controller.findAllPosts);

module.exports=router;