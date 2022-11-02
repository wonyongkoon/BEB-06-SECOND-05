const router=require("express").Router();
const controller=require("../controllers/main.controller");

router.post("/test",controller.datatest);
router.get('/confirm',controller.confirm);
router.post("/login",controller.login);
router.post("/logout",controller.logout);

module.exports=router;