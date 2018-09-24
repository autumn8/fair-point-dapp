import web3 from './web3';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x7d4b398469487cc50dc60994eeb96e86fd64a68d';
const { abi } = FairPoint;

const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;
