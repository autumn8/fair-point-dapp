import web3 from './web3';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x71c66f0ec47b8f659356c488522c26b10ac64c5f';
const { abi } = FairPoint;

const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;
