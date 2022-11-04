require("dotenv").config();
const db=require('../sequelize/models');
const jwt = require('jsonwebtoken');
const { tokenReward } = require( "../api/tokenReward")

const findAllPosts = async (req,res) => {
    try{
        const user_data=await db['post'].findAll({
            order:[
                ['date_at','desc']
            ]
        });
        res.json(user_data);

    }catch(err){
        console.log("에러");
        console.log(err);
    }
}
const postsave = async (req,res) =>{
    const data =req.body;
    const cookie=req.cookies.loginToken
    if(typeof cookie == "undefined"){
        return res.status(200).send("로그인 해주세요");
    }
    try{
        const cookdata=jwt.verify(cookie,process.env.SECRET_KEY);
        const address =cookdata.address;
        const success =await tokenReward(address);
        if(typeof success !="undefined"){
            await db['post'].create({
                user_id:cookdata.user_id,
                nickname:cookdata.nickname,
                content:data.content,
                image:data.image,
                user_image:data.userimage,
                title:data.title,

            }); 
            await db['user'].increment({token_amount:10},{where:{address:address}});
            return res.send("게시판 저장 성공");
        }
    }catch(err){
        console.log("에러");
        console.log(err);
    }
}

module.exports={
    findAllPosts,
    postsave
}