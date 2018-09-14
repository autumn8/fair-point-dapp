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
      <v-btn v-if="!userHasPurchasedFile" @click="buy()" right color="info">Buy Now: {{price}}</v-btn>
      <v-btn v-if="userHasPurchasedFile" @click="download()" right color="info">Download Now</v-btn>
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
			price: 0,
			userHasPurchasedFile: false
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
			contractInstance.methods
				.files(this.$route.params.id)
				.call({ from: accounts[0] })
				.then(res => {
					if (accounts[0] === res.buyer) {
						this.userHasPurchasedFile = true;
					}
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
			contractInstance.methods
				.purchaseFile(this.$route.params.id)
				.send({
					from: accounts[0],
					value: this.price,
					gas: '1000000'
				})
				.then(receipt => {
					this.userHasPurchasedFile = true;
				})
				.catch(error => {
					console.log('caught error');
					console.log(error);
				});
		}
	}
};
</script>
