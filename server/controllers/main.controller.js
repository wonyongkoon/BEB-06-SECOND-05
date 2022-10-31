const db=require('../sequelize/models');

const datatest=(req,res)=>{
    const data=req.body;
    res.json(data);
};


module.exports={
    datatest
}