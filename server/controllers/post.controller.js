require("dotenv").config();
const db=require('../sequelize/models');
const jwt = require('jsonwebtoken');

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
    const cookie=req.cookies.loginToken
    if(typeof cookie == "undefined"){
        return res.status(200).send("로그인 해주세요");
    }
    try{
        const cookdata=jwt.verify(cookie,process.env.SECRET_KEY);
        const address =cookdata.address;

        await db['post'].create({
            user_id:data.user_id,
            nickname:data.nickname,
            content:data.content,
            title:data.title,
        });
    
        return res.send("게시판 저장 성공");
    }catch(err){
        console.log("에러");
        console.log(err);
    }
}

module.exports={
    findAllPosts,
    postsave
}