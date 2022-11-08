//유저간에 token 전송 API 
require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');
const contractABI =require("../abi/erc20abi.json");
const contract20Address = "0x2e31c765e77457BBa686B4831627d929f56F3024"
const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';
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
	const contractAddress = "0x2e31c765e77457BBa686B4831627d929f56F3024" // erc20 토큰 컨트랙트 고정.
	const fromAddress = data.fromAddress; // 주는 계정
	const callPrivateKey = await db['user'].findOne({where:{address:data.fromAddress}})
	const privateKey = callPrivateKey.dataValues.privateKey; 
	const toAddress = data.toAddress; //목표 계정 
	const ethBalance = await getethBalanceOf(fromAddress)
	const tokenBalance = await getTOKENBalanceOf(fromAddress)
	const serverEtherBalance = await getethBalanceOf(serverAddress)
	
	console.log('server eth Balance : ' + serverEtherBalance ) 
	console.log('user ethBalance : ' + ethBalance)
	console.log('user token Balance : ' +tokenBalance)
	
	if (ethBalance < 10000000000000000){
		console.log('Insufficient gas')
		return res.status(400).send('가스비가 부족합니다. Faucet을 이용하세요')
	} else {
		try{
			if (tokenBalance < 0 || tokenBalance < amount){
				console.log('Insufficient EIT')
				return res.status(400).send('EIT가 부족합니다. 포스팅으로 EIT를 채굴하세요')
			} 
			const getGasAmount = async () => {
				let contract = new web3.eth.Contract(contractABI,contractAddress)
				const gasAmount = await contract.methods.transfer(toAddress, amount).estimateGas({ from: fromAddress })
				return gasAmount
			}
			const transferGas = await getGasAmount()
			
			//creating contract object
			let contract = new web3.eth.Contract(contractABI,contractAddress, {from: fromAddress} ); 
			let data = contract.methods.transfer(toAddress, amount).encodeABI(); //Create the data for token transaction.
			let rawTransaction = {"to": contractAddress, "gas": transferGas+10000, "data": data }; 
			//밸런스 확인 
			const getTOKENBalanceOf2 = async (address) => {
				return await contract.methods.balanceOf(address).call();                        
			}   
		
			web3.eth.accounts.signTransaction(rawTransaction, privateKey)
				.then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
				.then(req => { 
						getTOKENBalanceOf2(fromAddress)
						.then ( balance => { 
							console.log(fromAddress + "Token Balance: " + balance);
							db['user'].decrement({token_amount:amount},{where:{address:fromAddress}});
							db['user'].increment({token_amount:amount},{where:{address:toAddress}});
						});
						return res.status(200).send("토큰 전송 성공");
						// return true;  
				})  
				.catch(err => {
					console.log(err);
					return res.status(400).send("실패. 1분 후에 재시도 하세요");
				})
		} catch(err) {
			console.log("에러");
			console.log(err);
			}
	}	      
}

module.exports = {
    userTokenTransfer
}

