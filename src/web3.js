import Web3 from 'web3';
const appName = 'Fair Point';
let web3;

const getWeb3 = new Promise((resolve, reject) => {
	window.addEventListener('load', async () => {
		if (window.ethereum) {
			web3 = new Web3(window.ethereum);
			window.ethereum.enable();
			resolve(web3);
		} else if (window.web3) {
			web3 = new Web3(window.web3.currentProvider);
			resolve(web3);
		} else {
			reject('Non-Ethereum browser detected. Install MetaMask!');
		}
	});
});

export default getWeb3;
