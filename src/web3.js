import Web3 from 'web3';
let web3;

// TODO change this handle new post message of obtaining provider from metamask.
if (typeof window.web3 !== 'undefined' && typeof window.web3 != 'undefined') {
	// web3 = new Web3('wss://rinkeby.infura.io/ws'); for events
	web3 = new Web3(window.web3.currentProvider);
} else {
	console.warn(
		'Please install metmask' //TODO add uport provider
	);
}

export default web3;
