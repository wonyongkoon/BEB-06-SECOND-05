// const { userTokenTransfer } = require("../api/userToKenTransfer")
// userTokenTransfer('0x989C339d2CecA0D919Df26FDF1fF97b3384C2Bc0', '0x163164CB5442a3D087B2562Ccfb8A44F2Ea0E8C8' ,'0xc777e02a6ac8881887144110de80c6bc7433e71256b11cfabfa89f2fbbc9dbe1', 10)
require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4";//process.env.INFURA_KEY;
const web3 = new Web3(rpcURL);
// console.log(process.env.INFURA_KEY)
const db=require('../sequelize/models');

const erc20ABI = require("../abi/erc20abi.json");
const erc721ABI = require("../abi/erc721abi.json");

const erc20Address = "0x333F4693304D70A645E3F5E2678917350d54a76b"
const erc721Address = "0xf8bf085b2C5e1c09a86Ab8baA18d27514C4C805F"
const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755'
const privateKey = '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8';

const contract20 = new web3.eth.Contract(erc20ABI, erc20Address)
const contract721 = new web3.eth.Contract(erc721ABI, erc721Address)

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

const result2 = async () => {
	try{
		//creating contract object
		let contract = new web3.eth.Contract(erc20ABI,erc20Address, {from: '0x9AaeFB2A0D5DFa9aA536cCD27186d68507c9138f'} ); 
		let data = contract.methods.approve('0xf8bf085b2C5e1c09a86Ab8baA18d27514C4C805F', 100000).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": erc20Address, "gas": 100000, "data": data }; 

		const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, "0xe6892560c962d3eb03f4f0e2faf69bf5ac74f97a1da82e6aa54854a803940ad0");
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		
		return signedTx;
		} catch(err){
			console.log("web3에러");
			console.log(err);
		} 
		
} 

// result2()

console.log(contract721.methods)


// 1. 서버 계정으로 erc721 계정에 / erc20 - approve  - vs에서 한번만 해주면 됨 위에 result() 
// => caller : server, on : erc20, what : approve(erc721contractaddress)

// 2. 서버 계정으로 erc721 계정이 erc20 / erc721 - settoken - 리믹스에서 한번만 해주면 됨 
// => caller : server, on : erc721, what : settoken(erc20contractaddress) 

// 3. 구매자 계정으로 erc721 컨트랙트 계정 / erc20 - approve - 매번 해줘야함 -> mintNFT함수로  
// => caller : buyer, on : erc20, what : approve(approve721contractaddress) 

// 4. 서버 계정이 구매자 계정으로 민트 / erc721 - mintNFT - 매번 해줘야 함 -> mintNFT함수로 
// => caller : server, on : erc721, what : minNFT(buyer, tokenuri, price)

// 5. DB 업데이트 *만들어진 첫번째 nft의 tokenId는 1 

// console.log(contract20.methods)

const getTOKENBalanceOf = async () => {
	return await contract20.methods.balanceOf('0x9AaeFB2A0D5DFa9aA536cCD27186d68507c9138f').call()
	.then(result => {
		console.log(result)
	});                        
}

// getTOKENBalanceOf()

const ownerOfNFT = async () => {
	return await contract721.methods.ownerOf(2).call()
	.then(result => {
		console.log(result)
	});                        
}

ownerOfNFT()