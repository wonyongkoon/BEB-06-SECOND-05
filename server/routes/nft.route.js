const router=require("express").Router();
const controller=require("../controllers/nft.controller");

router.post("/nftall",controller.findAllnfts);


module.exports=router;