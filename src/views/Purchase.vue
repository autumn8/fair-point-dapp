<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs8>
          <v-card>
          <v-card-media :src="src" class="purchase-image"></v-card-media>
        </v-card>
        </v-flex >

        <v-card>
              <v-layout row>
                <v-flex xs12>
                  <v-card-title primary-title class="purchase-column">
                    <div>
                      <div class="headline font-weight-bold">{{fileName}}</div>
                      <div class="text-xs-left subheading font-weight-bold">{{formattedPrice}}</div>
                    </div>
                  </v-card-title>
                  </v-flex>
              </v-layout>
              <v-layout>

              <v-btn left v-if="!userHasPurchasedFile" @click="purchaseFile()" large dark color="grey" class="purchase-btn">Buy Now</v-btn>
              <v-btn left v-if="userHasPurchasedFile" @click="download()"  large dark color="grey" class="purchase-btn">Download Now</v-btn>
              </v-layout>

            </v-card>



      </v-layout>

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
		this.fileName = productResponse.data.data.fileName;
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

<style>
.purchase-column {
	min-width: 280px;
}

.v-btn {
	margin-left: 0;
}
</style>
