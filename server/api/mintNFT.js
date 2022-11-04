require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');
const contract721ABI =require("../abi/erc721abi.json");
const contract20ABI =require("../abi/erc20abi.json");

const contract721Address = ""
const contract20Address = "0x333F4693304D70A645E3F5E2678917350d54a76b"

const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';
const privateKey = '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8' //privatekey 교체 

const mintNFT = async (req, res) => {
	const data =req.body;
	const price = parseInt(data.price)
	const fromAddress = data.fromAddress; 
	const tokenURI = data.tokenURI; //메타데이터 json ipfs주소 

	try{
		let contract20 = new web3.eth.Contract(contract20ABI, contract20Address, {from: '구매자계정'} ); 
		let data20 = contract20.methods.approve(contract721Address, 100000).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": erc20Address, "gas": 3000000, "data": data20 }; 

		const signedTx20 = await web3.eth.accounts.signTransaction(rawTransaction, '구매자계정프라이빗키');
		web3.eth.sendSignedTransaction(signedTx20.rawTransaction);

		//creating contract object
		let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: serverAddress} ); 
		let data721 = contract721.methods.mintNFT(fromAddress, tokenURI, price).encodeABI(); //Create the data for token transaction.
		let rawTransaction721 = {"to": contract721Address, "gas": 3000000, "data": data721 }; 
	
		const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, privateKey);
		web3.eth.sendSignedTransaction(signedTx.rawTransaction721);

		await db['user'].decrement({token_amount:price},{where:{address:fromAddress}});
		// db nft 목록에 해당 nft user컬럼이 비어있다가 구매가되면 구매자 이름으로 업데이트
		// await db['nft'].update({user_id:구매자이름}, {where:{토큰아이디칼럼:구매한토큰아이디}})
		return signedTx;
		} catch(err){
			console.log("web3에러");
			console.log(err);
		} 
		
} 

// mintNFT()

// NFT 디비 테이블 칼럼: 사진 url, 메타데이터 url, NFT 가격정보 
// 로그인 계정이 마켓플레이스에서 nft를 구매한다. 
// 서버계정에서 mintNFT(가격정보와 로그인 계정을 받아서, 로그인 계정에서 비용을 서버에게 주고, 서버는 nft를만들어준다.) 
// 디비에서 가격 만큼 로그인계정의 토큰밸런스에서 차감된다.
// db nft 목록에 해당 nft user컬럼이 비어있다가 구매가되면 구매자 이름으로 업데이트


