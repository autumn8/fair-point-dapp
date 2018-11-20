import getWeb3 from './web3';
import { __ } from '@/utils';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x1edd797985ab0b0794dda7de6c8f5c8bc9c3473a';
const { abi } = FairPoint;

let contractInstance;

async function createContractInstance() {
	const { error, data: web3 } = await __(getWeb3);
	if (error) console.warn(error);
	return new web3.eth.Contract(abi, address);
}

async function getContractInstance() {
	if (!contractInstance) contractInstance = await createContractInstance();
	return contractInstance;
}

export default getContractInstance;
