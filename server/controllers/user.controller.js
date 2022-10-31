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
        await db['user'].create({
            user:data.user,
            user_id:data.user_id,
            nickname:data.nickname,
            email:data.email,
            password:data.password,
            data_at:data.user_data,
        });
        res.send("데이터 저장 성공");
    }catch(err){
        console.log("에러");
        console.log(err);
    }
}


module.exports={
    findAllUsers,
    saveUser
}