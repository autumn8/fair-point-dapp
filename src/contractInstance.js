import web3 from './web3';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0xe4651f1f52995f08320a28aa9c0f296fe721ffe4';
const { abi } = FairPoint;

const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;
