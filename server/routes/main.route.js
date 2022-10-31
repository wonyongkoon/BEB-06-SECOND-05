const router=require("express").Router();
const controller=require("../controllers/main.controller");

router.post("/test",controller.datatest);
router.post("/login",controller.login);

module.exports=router;