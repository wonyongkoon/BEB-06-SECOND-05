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
module.exports={
    findAllUsers,
}