const db=require('../sequelize/models');

const findAllPosts = async (req,res) => {
    try{
        const user_data=await db['post'].findAll();
        res.json(user_data);

    }catch(err){
        console.log("에러");
        console.log(err);
    }
    
    
}
module.exports={
    findAllPosts
}