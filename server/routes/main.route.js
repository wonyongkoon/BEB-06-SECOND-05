const router=require("express").Router();
const controller=require("../controllers/main.controller");

router.post("/test",controller.datatest);

module.exports=router;