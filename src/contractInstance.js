import web3 from './web3';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0x6524ee613f869ac2797df6519939aa6d6dba376c';
const { abi } = FairPoint;

const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;
