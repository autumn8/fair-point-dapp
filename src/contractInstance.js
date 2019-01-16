import { __ } from '@/utils';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x500DDFF9f71c7f4b67FAFc93c2428Dc6500D764A';
const { abi } = FairPoint;

let contractInstance;

function createContractInstance(web3) {
	return new Promise((resolve, reject) => {
		if (!web3) {
			reject('You need a web3 instance to interact with the contract');
		}
		contractInstance = new web3.eth.Contract(abi, address);
		resolve(contractInstance);
	});
}

export { createContractInstance, contractInstance };
