const router=require("express").Router();
const controller=require("../api/userTokenTransfer");

router.post("/userTokenTransfer",controller.userTokenTransfer);

module.exports=router;

