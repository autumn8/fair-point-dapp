import { __ } from '@/utils';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0xbfF5AD8940a58803e722107Cb30B2FF8CFC62874';
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
