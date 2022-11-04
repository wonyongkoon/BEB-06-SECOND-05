// const { userTokenTransfer } = require("../api/userToKenTransfer")
// userTokenTransfer('0x989C339d2CecA0D919Df26FDF1fF97b3384C2Bc0', '0x163164CB5442a3D087B2562Ccfb8A44F2Ea0E8C8' ,'0xc777e02a6ac8881887144110de80c6bc7433e71256b11cfabfa89f2fbbc9dbe1', 10)
require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(rpcURL);
const rpcURL = process.env.INFURA_KEY;
const db=require('../sequelize/models');

const erc20ABI = require("../abi/erc20abi.json");
const erc721ABI = require("../abi/erc721abi.json");

const erc20Address = "0x333F4693304D70A645E3F5E2678917350d54a76b"
const erc721Address = "0x189F10439E57abfB8d9EcB69cdAD1Ef9df587D3E"
const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755'
const privateKey = '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8';

const contract20 = new web3.eth.Contract(erc20ABI, erc20Address)
const contract721 = new web3.eth.Contract(erc721ABI, erc721Address)

console.log(contract20.methods)

const result = async () => {
	try{
		//creating contract object
		let contract = new web3.eth.Contract(erc20ABI,erc20Address, {from: serverAddress} ); 
		let data = contract.methods.approve(erc721Address, 100000).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": erc20Address, "gas": 100000, "data": data }; 
	

		const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		
		return signedTx;
		} catch(err){
			console.log("web3에러");
			console.log(err);
		} 
		
} 

result()



// const getTOKENBalanceOf = async () => {
// 	return await contract20.methods.balanceOf('0xeEa6a56B4f17CE7e24Dd63A44f74c162d4ada42b').call()
// 	.then(result => {
// 		console.log(result)
// 	});                        
// }

// getTOKENBalanceOf()