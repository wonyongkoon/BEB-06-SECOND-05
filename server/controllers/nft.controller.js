const db=require('../sequelize/models');

const findAllnfts = async (req,res) => {
    try{
        const user_data=await db['nft'].findAll({
            where:{
                user_id:"owner"
            }
        });
        res.json(user_data);

    }catch(err){
        console.log("에러");
        console.log(err);
    }
    
    
}

module.exports={
    findAllnfts
}