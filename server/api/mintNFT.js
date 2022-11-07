require("dotenv").config();
const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4"  
const web3 = new Web3(rpcURL);
const db=require('../sequelize/models');
const contract721ABI =require("../abi/erc721abi.json");
const contract20ABI =require("../abi/erc20abi.json");

const contract721Address = "0xf8bf085b2C5e1c09a86Ab8baA18d27514C4C805F"
const contract20Address = "0x333F4693304D70A645E3F5E2678917350d54a76b"

const serverAddress = '0x7842eBB02dAC50D732B0d337c8D9a92ade5cF755';
const privateKey = '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8' //privatekey 교체 

// 1. 서버 계정으로 erc721 계정에 / erc20 - approve  - vs에서 한번만 해주면 됨 위에 result() 
// => caller : server, on : erc20, what : approve(erc721contractaddress)

// 2. 서버 계정으로 erc721 계정이 erc20 / erc721 - settoken - 리믹스에서 한번만 해주면 됨 
// => caller : server, on : erc721, what : settoken(erc20contractaddress) 

// 3. 구매자 계정으로 erc721 컨트랙트 계정 / erc20 - approve - 매번 해줘야함 -> mintNFT함수로  
// => caller : buyer, on : erc20, what : approve(approve721contractaddress) 

// 4. 서버 계정이 구매자 계정으로 민트 / erc721 - mintNFT - 매번 해줘야 함 -> mintNFT함수로 
// => caller : server, on : erc721, what : minNFT(buyer, tokenuri, price)

// 5. DB 업데이트 *만들어진 첫번째 nft의 tokenId는 1 

const mintNFT = async (req, res) => {
	const data =req.body;
	const price = 10
	const fromAddress = data.fromAddress; 
	const tokenURI = data.tokenURI; //메타데이터 json ipfs주소 
	const callPrivateKey = await db['user'].findOne({where:{address:data.fromAddress}})
	const privateKey = callPrivateKey.dataValues.privateKey; 
	const id = data.id;
	console.log(`data : ${data} privatekey : ${privateKey}`)
	
	try{
		//erc20 -> erc721 approve(contract721Address)
		let contract20 = new web3.eth.Contract(contract20ABI, contract20Address, {from: fromAddress} ); 
		let data20 = contract20.methods.approve(contract721Address, 300000).encodeABI(); //Create the data for token transaction.
		let rawTransaction = {"to": contract20Address, "gas": 300000, "data": data20 }; 

		const signedTx20 = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
		web3.eth.sendSignedTransaction(signedTx20.rawTransaction);

		//mintNFT(recipient, tokenURI, price)
		let contract721 = new web3.eth.Contract(contract721ABI, contract721Address, {from: serverAddress} ); 
		let data721 = contract721.methods.mintNFT(fromAddress, tokenURI, price).encodeABI(); //(recipient, tokenuri, 가격)
		let rawTransaction721 = {"to": contract721Address, "gas": 200000, "data": data721 }; 
		
		const signedTx = await web3.eth.accounts.signTransaction(rawTransaction721, '06e62f2d492e32a888379a37f6a32c3c2efa0f586e712434a1387313419e20a8');
		web3.eth.sendSignedTransaction(signedTx.rawTransaction);

		//구매자의 토큰 밸런스 지출 
		await db['user'].decrement({token_amount:price},{where:{address:fromAddress}});
		// db nft 목록에 해당 nft user컬럼이 비어있다가 구매가되면 구매자 이름으로 업데이트
		await db['nft'].update({user_id:id}, {where:{metadata_url:tokenURI}})
		console.log('민팅 성공')

		return signedTx;
		} catch(err){
			console.log("web3에러");
			console.log(err);
		} 
		
} 


module.exports = {
    mintNFT
}

// mintNFT()

// NFT 디비 테이블 칼럼: 사진 url, 메타데이터 url, NFT 가격정보 
// 로그인 계정이 마켓플레이스에서 nft를 구매한다. 
// 서버계정에서 mintNFT(가격정보와 로그인 계정을 받아서, 로그인 계정에서 비용을 서버에게 주고, 서버는 nft를만들어준다.) 
// 디비에서 가격 만큼 로그인계정의 토큰밸런스에서 차감된다.
// db nft 목록에 해당 nft user컬럼이 비어있다가 구매가되면 구매자 이름으로 업데이트


