const router=require("express").Router();
const controller=require("../controllers/user.controller");

router.post("/userall",controller.findAllUsers);
router.post("/usersave",controller.saveUser);
router.post("/imagesave",controller.saveImage);


module.exports=router;