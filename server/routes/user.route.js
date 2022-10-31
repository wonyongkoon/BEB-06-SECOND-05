const router=require("express").Router();
const controller=require("../controllers/user.controller");

router.post("/userall",controller.findAllUsers);
router.post("/usersave",controller.saveUser);


module.exports=router;