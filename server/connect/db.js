require("dotenv").config();

const mysql=require("mysql");
const conn=mysql.createConnection({
    host:process.env.DATABASE_IP,
    port:'3306',
    user:'nft_user',
    password:process.env.DATABASE_PASSWORD,
    database:'project2_nft'
});


module.exports={conn};