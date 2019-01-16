import Web3 from 'web3';
const appName = 'Fair Point';
let web3;

function createWeb3Instance() {
	return new Promise((resolve, reject) => {
		window.addEventListener('load', async () => {
			if (window.ethereum) {
				web3 = new Web3(window.ethereum);
				window.ethereum.enable();
				console.log('created new Web3');
				resolve(web3);
			} else if (window.web3) {
				web3 = new Web3(window.web3.currentProvider);
				console.log('create web3 with current provider');
				resolve(web3);
			} else {
				reject('Please install MetaMask!');
			}
		});
	});
}

export { createWeb3Instance, web3 };
