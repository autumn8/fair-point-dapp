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
      <v-btn v-if="!userHasPurchasedFile" @click="purchaseFile()" right color="info">Buy Now: {{formattedPrice}}</v-btn>
      <v-btn v-if="userHasPurchasedFile" @click="download()" right color="info">Download Now</v-btn>
</v-container>
  </div>
</template>
<script>
import {
	getFileFromDB,
	getFileFromContract,
	purchaseFile
} from '@/fairPointService';
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
	async created() {
		const fileID = this.$route.params.id;
		const productResponse = await __(getFileFromDB(fileID));
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
			const contractResponse = await __(getFileFromContract(fileID));
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
		async purchaseFile() {
			// TODO find better way to handle various on events.
			const fileID = this.$route.params.id;
			const purchaseResponse = await __(purchaseFile(fileID, this.price));
			if (purchaseResponse.error) {
				this.formError = true;
				this.msg = errorMessages.ERROR_PURCHASING_FILE;
				return;
			}
			this.userHasPurchasedFile = true;
			this.downloadRoute = `http://localhost:8080/download/${fileID}`;
			console.log(purchaseResponse.data);
		}
	}
};
</script>
