<template>
  <div>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs6>
          <v-card>
            <v-img
              :src="src"
              aspect-ratio="1"
              class="grey lighten-2">
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
      <v-btn v-if="!userHasPurchasedFile" @click="buy()" right color="info">Buy Now: {{formattedPrice}}</v-btn>
      <v-btn v-if="userHasPurchasedFile" @click="download()" right color="info">Download Now</v-btn>
</v-container>
  </div>
</template>
<script>
import { getFileFromDB, getFileFromContract } from '@/fairPointService';
import web3 from '@/web3';
import contractInstance from '@/contractInstance';
import { __ } from '@/utils';

export default {
	data() {
		return {
			src: '',
			price: 0,
			userHasPurchasedFile: false,
			downloadRoute: '',
			formattedPrice: 0
		};
	},
	created() {
		const fileID = this.$route.params.id;
		const productResponse = __(getFileFromDB(fileID));
		if (productResponse.error) {
			this.formError = true;
			this.msg = errorMessages.ERROR_FETCHING_FILE_FROM_DB;
			return;
		}
		this.src = `http://ipfs.io/ipfs/${productResponse.data.data.previewHash}`;
		this.getPaymentDataFromContract(fileID);
	},
	methods: {
		async getPaymentDataFromContract(fileID) {
			const accounts = await web3.eth.getAccounts();
			const contractResponse = __(getFileFromContract(fileID));
			if (contractResponse.error) {
				this.formError = true;
				this.msg = errorMessages.ERROR_FETCHING_FILE_FROM_CONTRACT;
				return;
			}
			const { buyer, price } = contractResponse.data;

			if (accounts[0] === buyer) {
				this.userHasPurchasedFile = true;
				this.downloadRoute = `http://localhost:8080/download/${fileID}`;
			}
			this.price = price;
			this.formattedPrice = `${web3.utils.fromWei(this.price, 'ether')} Eth`;
		},

		async download() {
			const accounts = await web3.eth.getAccounts();
			const fileID = this.$route.params.id;
			const msg = web3.utils.utf8ToHex(fileID);
			const signature = await web3.eth.personal.sign(msg, accounts[0]);
			// use window open to launch save dialog.
			window.open(`http://localhost:8080/download/${fileID}/${signature}`);
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
					this.downloadRoute = `http://localhost:8080/download/${
						this.$route.params.id
					}`;
					console.log(receipt);
				})
				.catch(error => {
					console.log('caught error');
					console.log(error);
				});
		}
	}
};
</script>
