<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs8>
          <v-card>
            <v-card-media :src="src" class="purchase-image"></v-card-media>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
             <v-flex xs12>
              <v-layout row>              
                  <v-card-title primary-title class="purchase-column">
                    <div>
                      <div class="headline font-weight-bold">{{title}}</div>
                      <div class="text-xs-left subheading font-weight-bold">{{formattedPrice}}</div>
                    </div>
                  </v-card-title>                
              </v-layout>
             </v-flex>
            <v-layout>
              <v-btn
                left
                v-if="!userHasPurchasedFile"
                @click="purchaseFile()"
                large
                dark
                color="grey"
                class="purchase-btn"
              >Buy</v-btn>
              <v-btn
                left
                v-if="userHasPurchasedFile"
                @click="download()"
                large
                dark
                color="grey"
                class="purchase-btn"
              >Download Now</v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import errorMessages from "@/errorMessages";
import fairPointService from "@/fairPointService";
import store from "@/store";

import { __ } from "@/utils";

export default {
  data() {
    return {
      title: "",
      src: "",
      price: 0,
      userHasPurchasedFile: false,
      downloadRoute: "",
      formattedPrice: 0
    };
  },
  async created() {
    const fileID = this.$route.params.id;
    const productResponse = await __(fairPointService.getFileDataFromDB(fileID));
    if (productResponse.error) {
      this.formError = true;
      this.msg = errorMessages.ERROR_FETCHING_FILE_FROM_DB;
      return;
    }
    this.src = `${process.env.VUE_APP_IPFS_GATEWAY}/${productResponse.data.data.previewHash}`;
    this.title = productResponse.data.data.title;
    this.getPaymentDataFromContract(fileID);
  },
  methods: {
    async getPaymentDataFromContract(fileID) {
      //TODO extract method to service
      const { web3 } = store.state;
      const accounts = await web3.eth.getAccounts();
      const contractResponse = await __(
        fairPointService.getFileFromContract(fileID)
      );
      if (contractResponse.error) {
        this.formError = true;
        this.msg = errorMessages.ERROR_FETCHING_FILE_FROM_CONTRACT;
        return;
      }
      const { buyer, price } = contractResponse.data;

      if (accounts[0] === buyer) {
        this.userHasPurchasedFile = true;       
      }
      this.price = price;
      this.formattedPrice = `${web3.utils.fromWei(this.price, "ether")} Eth`;
    },

    async download() {
      const { web3 } = store.state;
      const accounts = await web3.eth.getAccounts();
      const fileID = this.$route.params.id;
      const msg = web3.utils.utf8ToHex(fileID);
      const signature = await web3.eth.personal.sign(msg, accounts[0]);
      // use window open to launch save dialog.
      window.open(`${process.env.VUE_APP_ROOT_URL}/download/${fileID}/${signature}`);
    },
    async purchaseFile() {
      // TODO find better way to handle various on events.
      const fileID = this.$route.params.id;
      const purchaseResponse = await __(
        fairPointService.purchaseFile(fileID, this.price)
      );
      if (purchaseResponse.error) {
        this.formError = true;
        this.msg = errorMessages.ERROR_PURCHASING_FILE;
        return;
      }
      this.userHasPurchasedFile = true;      
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
