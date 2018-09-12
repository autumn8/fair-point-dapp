import Web3 from 'web3';
let web3;

if (typeof window.web3 === 'undefined') {
	window.addEventListener('message', ({ data }) => {
		if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS') {
			web3 = new Web3(ethereum);
		}
	});
	window.postMessage({ type: 'ETHEREUM_PROVIDER_REQUEST' }, '*');
}
//fallback
else {
	web3 = new Web3(window.web3.currentProvider);
}

export default web3;
