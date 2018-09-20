import web3 from '@/web3';
import axios from 'axios';
import contractInstance from '@/contractInstance';

function sendForm(files) {
	const formData = new FormData();
	formData.append('primary', files.primary, files.primary.name);
	formData.append('preview', files.preview, files.primary.name);
	return axios.post('http://localhost:8080/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

async function addFileToContract(fileID, price) {
	const accounts = await web3.eth.getAccounts();
	const gas = '1000000';
	return contractInstance.methods.addFile(fileID, price).send({
		from: accounts[0],
		gas
	});
}

async function getFileFromContract(fileID, amount, ethUnit) {
	const file = await contractInstance.methods
		.files(fileID)
		.call({ from: accounts[0] });
}

export { addFileToContract, sendForm };
