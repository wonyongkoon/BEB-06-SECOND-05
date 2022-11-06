const router=require("express").Router();
const controller=require("../api/mintNFT");

router.post("/mintNFT",controller.mintNFT);

module.exports=router;


