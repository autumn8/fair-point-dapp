import web3 from '@/web3';
import axios from '@/axios';
import getContractInstance from '@/contractInstance';

function sendForm(files) {
	const formData = new FormData();
	formData.append('primary', files.primary, files.primary.name);
	formData.append('preview', files.preview, files.primary.name);
	return axios.post('/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

async function getEtherToZarExchangeRate() {
	return axios.get(
		'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ZAR'
	);
}

async function getAllFiles() {
	return axios.get(`/files`);
}

//This simply retrieves from orbitDB so we could get it directly in client?
async function getFileFromDB(fileID) {
	return axios.get(`/purchase/${fileID}`);
}

async function getFileFromContract(fileID) {
	const accounts = await web3.eth.getAccounts();
	const contractInstance = await getContractInstance();
	return contractInstance.methods.files(fileID).call({ from: accounts[0] });
}

async function addFileToContract(fileID, price) {
	const accounts = await web3.eth.getAccounts();
	const gas = '1000000';
	const contractInstance = await getContractInstance();
	return contractInstance.methods.addFile(fileID, price).send({
		from: accounts[0],
		gas
	});
}

async function purchaseFile(fileID, value) {
	const accounts = await web3.eth.getAccounts();
	const gas = '1000000';
	const contractInstance = await getContractInstance();
	return contractInstance.methods.purchaseFile(fileID).send({
		from: accounts[0],
		value,
		gas
	});
}

export {
	addFileToContract,
	purchaseFile,
	sendForm,
	getAllFiles,
	getFileFromDB,
	getFileFromContract,
	getEtherToZarExchangeRate
};
