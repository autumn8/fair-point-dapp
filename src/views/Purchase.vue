<template>
  <div>
    <v-container>
      <v-card>
        <v-img
          :src="src"
          aspect-ratio="1"
          class="grey lighten-2">
        </v-img>
      </v-card>
      <v-btn @click="buy()" right color="info">Buy Now: {{price}}</v-btn>
</v-container>
  </div>
</template>
<script>
import axios from 'axios';
import web3 from '@/web3';
import contractInstance from '@/contractInstance';
import { getBytes32FromIpfsHash } from '@/ipfsHashConversion';

export default {
	data() {
		return {
			src: '',
			price: 0
		};
	},
	created() {
		axios
			.get(`http://localhost:8080/purchase/${this.$route.params.id}`)
			.then(async res => {
				this.src = `http://ipfs.io/ipfs/${res.data.previewHash}`;
				this.getEthereumData(this.$route.params.id);
				console.log('SUCCESS!!');
			})
			.catch(function() {
				console.log('FAILURE!!');
			});
	},
	methods: {
		async getEthereumData() {
			const accounts = await web3.eth.getAccounts();
			const bytes32 = getBytes32FromIpfsHash(this.$route.params.id);
			console.log(bytes32);
			contractInstance.methods
				.files(bytes32)
				.call({ from: accounts[0] })
				.then(res => {
					this.price = res.price;
					this.formattedPrice = `${web3.utils.fromWei(
						this.price,
						'ether'
					)} Eth`;
				})
				.catch(err => console.log(err));
		},
		async buy() {
			const accounts = await web3.eth.getAccounts();
			const bytes32 = getBytes32FromIpfsHash(this.$route.params.id);
			console.log(bytes32);
			contractInstance.methods
				.purchaseFile(bytes32)
				.send({
					from: accounts[0],
					value: this.price,
					gas: '1000000'
				})
				.once('transactionHash', hash => {
					console.log('hash');
					console.log(hash);
				})
				.once('receipt', receipt => {
					console.log('receipt');
					console.log(receipt);
				})
				.on('confirmation', (confirmationNumber, receipt) => {
					console.log('confirmationNumber');
					console.log(confirmationNumber);
				})
				.on('error', error => {
					console.log('ERROR');
					console.log(error);
				})
				.then(receipt => {
					console.log(receipt);
				})
				.catch(error => {
					console.log('caught error');
					console.log(error);
				});

			// const await contractInstance.methods.purchaseFile(bytes32).send({
			// 	from: accounts[0],
			// 	value: this.price,
			// 	gas: '1000000'
			// });

			// await contractInstance.methods
			// 	.files(bytes32)
			// 	.call({ from: accounts[0] })
			// 	.then(res => {
			// 		console.log(res);
			// 	})
			// 	.catch(err => console.log(err));
		}
	}
};
</script>
