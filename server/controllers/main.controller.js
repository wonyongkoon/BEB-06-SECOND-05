require("dotenv").config();
const db=require('../sequelize/models');
const jwt = require('jsonwebtoken');

const datatest=(req,res)=>{
    const data=req.body;
    res.json(data);
};

const login= async (req,res)=>{
    const data=req.body;
    try{
        const userdata = await db['user'].findAll({
            where:{
                user_id:data.user_id
            }
        });
        if(userdata[0].password != data.password) {
            return res.send("비밀번호 일치하지않음");
        }
        const payload={
            nickname:userdata[0].nickname,
            email:userdata[0].email,
            address:userdata[0].address,
            token_amount:userdata[0].token_amount,
            eth_amount:userdata[0].eth_amount,
            data_at:userdata[0].data_at
        }
        const jwtToken=await tokencreate(payload);
        res.cookie('jwt',jwtToken,{httpOnly:true,signed:true});
        return res.send("성공입니당");
    }catch(err){
        console.log(err);
    }
};

const tokencreate =(payload)=>{
    const SECRET_KEY = process.env.SECRET_KEY;
    const token =jwt.sign(payload,SECRET_KEY,{expiresIn:'15m'});
    return token;
}

module.exports={
    datatest,
    login
}