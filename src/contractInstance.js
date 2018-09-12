import web3 from './web3';

import FairPoint from '../build/contracts/FairPoint.json';
const address = '0xca597b65e94978fa27fa0a8e443a4662b4e076fd';
const { abi } = FairPoint;

const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;
