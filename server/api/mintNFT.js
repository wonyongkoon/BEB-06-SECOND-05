require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');

const contract721ABI =require("../abi/erc721abi.json");
const contract20ABI =require("../abi/erc20abi.json");
const contract721Address = "0xB36FF334C06d57DFECbF70f22A41EBEf22456f60"
const contract20Address = "0x333F4693304D70A645E3F5E2678917350d54a76b"

const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';
const privateKey = '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8' //privatekey 교체 

const getethBalanceOf = async (address) => {
	return await web3.eth.getBalance(address)
	.then(result => {
		return (parseInt(result))
	});                        
}

const getTOKENBalanceOf = async (address) => {
	const contract20 = new web3.eth.Contract(contract20ABI, contract20Address)
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

const mintNFT = async (req, res) => {
	const data =req.body;
	const price = 10
	const fromAddress = data.fromAddress; 
	const tokenURI = data.tokenURI; //메타데이터 json ipfs주소 
	const callPrivateKey = await db['user'].findOne({where:{address:data.fromAddress}})
	const userPrivateKey = callPrivateKey.dataValues.privateKey; 
	const id = callPrivateKey.user_id
	const callUser_id = await db['nft'].findOne({where:{metadata_url:tokenURI}})
	const ethBalance = await getethBalanceOf(fromAddress)
	const tokenBalance = await getTOKENBalanceOf(fromAddress)
	const callGasPrice = await getGasPrice() 
	const gasPrice = Math.round(1.09*callGasPrice)
	console.log('gasPrice : ' + gasPrice)
	console.log('id::'+id)
	console.log('ethBalance : ' + ethBalance)
	console.log('tokenBalance : ' + tokenBalance)

	if (callUser_id.dataValues.user_id === id){ 
		console.log('Alreday yours')
		return res.status(400).send('Already yours') 
	} else if (callUser_id.dataValues.user_id !== 'owner'){
		console.log('already sold')
		return res.status(400).send('Already sold')
	} 
	else {
			if (ethBalance<1000000){
				console.log('Insufficient gas')
				return res.status(400).send('Insufficient gas. Use eth faucet!')
			} else {
				if (tokenBalance<10){
					console.log('Insufficient EIT')
					return res.status(400).send('Insufficient EIT. Get EIT by posting on E2I2')
				} 
				try{
				//erc20 -> erc721 approve (사용자의 토큰을 민팅에 사용할 수 있게 설정)
				await db['user'].update({token_amount:tokenBalance-price},{where:{address:fromAddress}}); // 구매자의 토큰 밸런스 지출 
				await db['nft'].update({user_id:id}, {where:{metadata_url:tokenURI}})
				let contract20 = new web3.eth.Contract(contract20ABI, contract20Address, {from: fromAddress} ); 
				let data20 = contract20.methods.approve(contract721Address, 10000).encodeABI(); //Create the data for token transaction.
				let rawTransaction = {"to": contract20Address, "gas": 200000, "data": data20 }; 
	
				const signedTx20 = await web3.eth.accounts.signTransaction(rawTransaction, userPrivateKey);
				web3.eth.sendSignedTransaction(signedTx20.rawTransaction);
	
				//mintNFT(recipient, tokenURI, price)
				let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: serverAddress} ); 
				let data721 = contract721.methods.mintNFT(fromAddress, tokenURI, 10).encodeABI(); //(recipient, tokenuri, 가격)
				let rawTransaction721 = {"to": contract721Address, "gas": 2000000, "data": data721 }; 
			
				const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, privateKey);
				web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	
				
				// db nft 목록에 해당 nft user컬럼이 비어있다가 구매가되면 구매자 이름으로 업데이트
				console.log('wait for 40 seconds')
				setTimeout(() => {console.log('minting success')}, 40000);
				res.send(signedTx)
			return signedTx;
			} catch(err){
				console.log("web3에러");
				console.log(err);
			} 
			}
			
	}		
} 

module.exports = {
    mintNFT
}


// 1. 서버 계정으로 erc721 계정에 / erc20 - approve  - vs에서 한번만 해주면 됨 위에 result() 
// => caller : server, on : erc20, what : approve(erc721contractaddress)

// 2. 서버 계정으로 erc721 계정이 erc20 / erc721 - settoken - 리믹스에서 한번만 해주면 됨 
// => caller : server, on : erc721, what : settoken(erc20contractaddress) 

// 3. 구매자 계정으로 erc721 컨트랙트 계정 / erc20 - approve - 매번 해줘야함 -> mintNFT함수로  
// => caller : buyer, on : erc20, what : approve(approve721contractaddress) 

// 4. 서버 계정이 구매자 계정으로 민트 / erc721 - mintNFT - 매번 해줘야 함 -> mintNFT함수로 
// => caller : server, on : erc721, what : minNFT(buyer, tokenuri, price)

// 5. DB 업데이트 *만들어진 첫번째 nft의 tokenId는 1 


