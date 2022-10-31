const db=require('../sequelize/models');

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
        await db['user'].create({
            user_id:data.user_id,
            nickname:data.nickname,
            email:data.email,
            password:data.password,
        });
        return res.send("데이터 저장 성공");
    }catch(err){
        console.log(err);
        return res.send("에러");
    }
}


module.exports={
    findAllUsers,
    saveUser
}