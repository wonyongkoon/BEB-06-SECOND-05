require("dotenv").config();

const development={
    username: "nft_user",
    password: process.env.DATABASE_PASSWORD,
    database: "project2_nft",
    host: process.env.DATABASE_IP,
    dialect: "mysql"
  }

module.exports={development}