const router=require("express").Router();
const controller=require("../api/mintNFT");

router.post("/",controller.mintNFT);

module.exports=router;

