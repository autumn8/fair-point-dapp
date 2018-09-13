import web3 from '@/web3';
import axios from 'axios';

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

export { sendForm };
