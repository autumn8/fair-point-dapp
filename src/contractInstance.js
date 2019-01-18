import { __ } from '@/utils';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x5796BfA15b18B90eaB6DF5fA9c9E1471B968718f';
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
