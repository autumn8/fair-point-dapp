import web3 from '@/web3';
import axios from 'axios';
import { getBytes32FromIpfsHash } from '@/ipfsHashConversion';
import contractInstance from '@/contractInstance';

function sendForm(primaryImage, previewImage, price) {
	const formData = new FormData();
	formData.append('primary', primaryImage, 'primary');
	formData.append('preview', previewImage, 'preview');
	formData.append('price', price);
	return axios.post('http://localhost:8080/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

async function addFileToContract(fileID, amount, ethUnit) {
	debugger;
	const accounts = await web3.eth.getAccounts();
	const gas = '1000000';
	console.log(accounts[0]);
	const price = web3.utils.toWei(amount, ethUnit);
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
