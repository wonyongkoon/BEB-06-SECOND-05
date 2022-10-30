
const main=require("./main.route");
const nft=require("./nft.route");
const user=require("./user.route");
const post=require("./post.route");

module.exports= app=>{
    app.use("/",main);
    app.use("/user",user);
    app.use("/nft",nft);
    app.use("/post",post);
}