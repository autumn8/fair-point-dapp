import web3 from './web3';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x5a299b4f2adc002dcb54cd9b5b3bf8179178fc2f';
const { abi } = FairPoint;

const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;
