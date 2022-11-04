require("dotenv").config();
const Web3 = require("web3");
const rpcURL = process.env.INFURA_KEY  //API KEY 교체!!
const web3 = new Web3(rpcURL);
const contractABI =require("../abi/erc20abi.json");
const privateKey = process.env.SERVE_SECRET_KEY; 

const tokenReward = async (address) => {

	// 1.게시글 post요청이 성공하면 2. 해당 유저의 지갑 address를 조회 3. 서버계정에서 토큰 지급 
	const contractAddress = "0x333F4693304D70A645E3F5E2678917350d54a76b"; // erc20 토큰 컨트랙트
	const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755'; // 서버 계정
	const toAddress = address ; //목표 계정 

	try{
	//creating contract object
	let contract = new web3.eth.Contract(contractABI,contractAddress, {from: serverAddress} ); 
	let data = contract.methods.transfer(toAddress, 10).encodeABI(); //Create the data for token transaction.
	let rawTransaction = {"to": contractAddress, "gas": 200000, "data": data }; 

	//밸런스 확인 
	const getTOKENBalanceOf = async (address) => {
		return await contract.methods.balanceOf(address).call();                        
	}   
	const signedTx =await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
	web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	// getTOKENBalanceOf(toAddress);
	return signedTx;
	} catch(err){
        console.log("web3에러");
        console.log(err);
    } 
	}

module.exports = {
    tokenReward
}

