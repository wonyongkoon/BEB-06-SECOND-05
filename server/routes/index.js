
const main=require("./main.route");
const nft=require("./nft.route");
const user=require("./user.route");
const post=require("./post.route");
const userTokenTransfer=require("./userTokenTransfer.route")
const mintNFT=require("./mintNFT.route")

module.exports= app=>{
    app.use("/",main);
    app.use("/user",user);
    app.use("/nft",nft);
    app.use("/post",post);
    app.use("/userTokenTransfer",userTokenTransfer)
    app.use("/mintNFT",mintNFT)
}