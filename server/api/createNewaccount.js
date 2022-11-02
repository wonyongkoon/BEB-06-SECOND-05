const Web3 = require("web3");
const rpcURL = "https://goerli.infura.io/v3/02a8145cfe2844f79fd84b16a2e5bafd"
const web3 = new Web3(rpcURL)
console.log(web3.eth.accounts.create())


// web3.eth.personal.newAccount('2123')
//                            .then(account => console.log(account));
// getNewAccount = async () => {
// 	await web3.eth.accounts.create('dfddfasdasdaas')
//     .then(result => {
//         console.log(result)
//     })

// }

// getNewAccount()


