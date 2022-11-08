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
        res.status(400).send("데이터베이스 에러");
        console.log("에러");
        console.log(err);
    }
}
const postsave = async (req,res) =>{
    const data =req.body;
    const cookie=req.cookies.loginToken
    if(typeof cookie == "undefined"){
        return res.status(400).send("로그인 해주세요");
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
            return res.status(200).send("게시판 저장 성공");
        }
        return res.status(400).send('실패했습니다.');
    }catch(err){
        return res.status(400).send('실패했습니다.');
        console.log("에러");
        console.log(err);
    }
}

const findcomment = async (req,res)=>{
    const data = req.body;
    try{
        const comment = await db['post_detail'].findAll({
            where:{
                post_id:data.post_id
            }
        })
        return res.status(200).json({data:comment});

    }catch(err){
        console.log("findcomment 에러");
        console.log(err);
    }

}

const commentsave = async (req,res)=>{
    const data = req.body;
    const cookie=req.cookies.loginToken
    if(typeof cookie == "undefined"){
        return res.status(400).send("로그인 해주세요");
    }
    try{
        const cookdata=jwt.verify(cookie,process.env.SECRET_KEY);
        await db['post_detail'].create({
            post_id:data.post_id,
            nickname:cookdata.nickname,
            comment:data.comment,
            image:data.image,
        });
        return res.status(200).send("댓글 저장 성공");


    }catch(err){
        return res.status(400).send("잠시 후 다시 시도해보세요");
        console.log("commentsave 에러");
        console.log(err);
    }

}

module.exports={
    findAllPosts,
    postsave,
    findcomment,
    commentsave
}