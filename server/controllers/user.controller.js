const db=require('../sequelize/models');
const {web3}=require('../connect/web3');
const jwt = require('jsonwebtoken');

const findAllUsers = async (req,res) => {
    try{
        // const user_data=await AllUsers();
        const user_data=await db['user'].findAll();
        res.json(user_data);

    }catch(err){
        console.log("에러");
        console.log(err);
    }
    
    
}
const saveUser = async (req,res) =>{
    const data=req.body;
    try{
        const nickname = await db['user'].findAll({
            where:{
                user_id:data.user_id
            }
        });
        if(nickname.length!=0){
            return res.status(400).send("이미 있는 ID 입니다.");
        }
        const image = await db['user'].findOne({  
            attributes:['image'],
            where:{
                user_id:"defalut"
            }  
        });
        const web3Data = web3.eth.accounts.create();
        await db['user'].create({
            user_id:data.user_id,
            nickname:data.nickname,
            email:data.email,
            password:data.password,
            address:web3Data.address,
            privateKey:web3Data.privateKey,
            image:image.dataValues.image
        });

        return res.send("데이터 저장 성공");
    }catch(err){
        console.log(err);
        return res.status(400).send("회원 가입 실패");
    }
}
const saveImage = async(req,res)=>{
    const data=req.body;
    const cookie=req.cookies.loginToken;
    if(typeof cookie == "undefined"){
        return res.status(400).send("로그인 해주세요");
    };
    try{
        const cookdata=jwt.verify(cookie,process.env.SECRET_KEY);
        await db['user'].update({image:data.image},{where:{
            user_id:cookdata.user_id
        }})
        await db['post'].update({user_image:data.image},{where:{
            user_id:cookdata.user_id
        }})
        await db['post_detail'].update({image:data.image},{where:{
            nickname:cookdata.nickname
        }})
        return res.send("성공");
    }
    catch(err){
        console.log("saveImge 에러");
        return res.status(400).send("프로필 사진 변경 실패");
        console.log(err);
    }
   
}


module.exports={
    findAllUsers,
    saveUser,
    saveImage
}