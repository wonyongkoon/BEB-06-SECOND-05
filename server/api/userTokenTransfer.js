//유저간에 token 전송 API 
require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');
const contractABI =require("../abi/erc20abi.json");
const contract20Address = "0x333F4693304D70A645E3F5E2678917350d54a76b"
const e = require("express");

const getethBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const getTOKENBalanceOf = async (address) => {
	const contract20 = new web3.eth.Contract(contractABI, contract20Address)
	return await contract20.methods.balanceOf(address).call()
	.then(result => {
		return parseInt(result)
	});                        
}

const getGasPrice = async () => {
	return await web3.eth.getGasPrice()
	.then(result => {
		return parseInt(result)
	});                        
}


const userTokenTransfer = async (req, res) => {
	const data =req.body;
	const amount = parseInt(data.amount) 
	const contractAddress = "0x333F4693304D70A645E3F5E2678917350d54a76b" // erc20 토큰 컨트랙트 고정.
	const fromAddress = data.fromAddress; // 주는 계정
	const callPrivateKey = await db['user'].findOne({where:{address:data.fromAddress}})
	const privateKey = callPrivateKey.dataValues.privateKey; 
	const toAddress = data.toAddress; //목표 계정 
	const ethBalance = await getethBalanceOf(fromAddress)
	const tokenBalance = await getTOKENBalanceOf(fromAddress)
	const toTokenBalance = await getTOKENBalanceOf(toAddress)
	const dbTokenBalance = callPrivateKey.dataValues.token_amount;
	const gasPrice = await getGasPrice()
	console.log(dbTokenBalance)
	console.log(tokenBalance)
	

	if (ethBalance < 1000000){
		console.log('Insufficient gas')
		return res.status(400).send('Insufficient gas. Use eth faucet!')
	} else {
		try{
			if (tokenBalance < 0 || tokenBalance < amount){
				console.log('Insufficient EIT')
				return res.status(400).send('Insufficient EIT. Get EIT by posting on E2I2')
			} 
			//creating contract object
			let contract = new web3.eth.Contract(contractABI,contractAddress, {from: fromAddress} ); 
			let data = contract.methods.transfer(toAddress, amount).encodeABI(); //Create the data for token transaction.
			let rawTransaction = {"to": contractAddress, "gas": 1000000, "data": data }; 
		
			//밸런스 확인 
			const getTOKENBalanceOf2 = async (address) => {
				return await contract.methods.balanceOf(address).call();                        
			}   
		
			web3.eth.accounts.signTransaction(rawTransaction, privateKey)
				.then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
				.then(req => { 
						getTOKENBalanceOf2(toAddress).then ( balance => { console.log(toAddress + " Token Balance: " + balance); });
						return res.send("토큰 전송 성공");
						// return true;  
				})    
			await db['user'].update({token_amount:tokenBalance-amount},{where:{address:fromAddress}});
			await db['user'].update({token_amount:toTokenBalance+amount},{where:{address:toAddress}});
			console.log('wait for 40 seconds')
				setTimeout(() => {console.log('Transfer success')}, 40000);
		
			} catch(err){
				console.log("에러");
				console.log(err);
			}

	}
	
	      
	}

module.exports = {
    userTokenTransfer
}

