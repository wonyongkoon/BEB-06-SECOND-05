const router=require("express").Router();
const controller=require("../controllers/user.controller");

router.post("/userall",controller.findAllUsers);


module.exports=router;