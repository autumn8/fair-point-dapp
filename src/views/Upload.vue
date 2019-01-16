<template>
  <v-container class="upload" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs6>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <file-upload
                v-model="files.primary"
                :rules="fileRules"
                message="Select file available for purchase"
              />
              <file-upload v-model="files.preview" message="Select low-res preview file"/>
              <v-text-field
                label="Title"
                prepend-icon="create"
                name="title"
                :rules="fileDisplayNameRules"
                v-model.lazy="fileDisplayName"
              ></v-text-field>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-text-field
                    @input="onPriceChange()"
                    label="Price in Ether"
                    :rules="priceRules"
                    prepend-icon="euro_symbol"
                    v-model.lazy="price"
                    :suffix="priceSuffix"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit()" color="info" :disabled="!valid" :loading="isSending">Send</v-btn>
          </v-card-actions>
        </v-card>
        <v-container v-if="purchaseURL">
          <p>This is the link to your purchase page:</p>
          <v-btn router :to="purchaseURL" flat>{{absolutePurchaseURL}}</v-btn>
        </v-container>
        <p :class="{error : formError, msg}">{{msg}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { web3 } from "@/web3";
import FileUpload from "@/components/FileUpload.vue";
import fairPointService from "@/fairPointService";
import { __ } from "@/utils";
import errorMessages from "@/errorMessages";

export default {
  name: "Upload",
  beforeRouteLeave(to, from, next) {
    if (this.price > 0 || this.fileDisplayName || this.files.primary || this.files.preview) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
			}
			return;
		}
		next();
  },
  components: {
    "file-upload": FileUpload
  },
  async created() {
    const exchangeRateResponse = await __(
      fairPointService.getEtherToZarExchangeRate()
    );
    if (exchangeRateResponse.data && exchangeRateResponse.data.data.ZAR) {
      this.exchangeRate = exchangeRateResponse.data.data.ZAR;
    }
  },
  data() {
    return {
      price: 0,
      formError: false,
      valid: false,
      purchaseURL: null,
      absolutePurchaseURL: null,
      msg: "",
      priceSuffix: "",
      isSending: false,
      exchangeRate: undefined,
      ethUnit: "Ether",
      fileDisplayName: "",
      fileDisplayNameRules: [
        v => v.length > 0 || "Please provide a display name for your file",
        v =>
          v.length < 50 ||
          "The display name must be less than 50 characters in length"
      ],
      priceRules: [
        v => !!v || "Please provide an amount",
        v => !isNaN(v) || "Amount needs to be a number"
      ],
      fileRules: [v => !!v || "Please attach a file"],
      files: {
        primary: undefined,
        preview: undefined
      }
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;
      this.isSending = true;
      const formResponse = await __(
        fairPointService.sendForm(this.files, this.fileDisplayName)
      );
      if (formResponse.error) {
        this.formError = true;
        this.msg = errorMessages.ERROR_ON_IMAGE_UPLOAD;
        this.isSending = false;
        return;
      }
      console.log("***********");
      console.log(web3);
      const price = web3.utils.toWei(this.price, this.ethUnit);
      const fileID = formResponse.data.data._id;
      const contractResponse = await __(
        fairPointService.addFileToContract(fileID, price)
      );
      if (contractResponse.error) {
        this.msg = errorMessages.ERROR_ADDING_TO_CONTRACT;
        this.formError = true;
        this.isSending = false;
        return;
      }
      this.isSending = false;
      this.purchaseURL = `/purchase/${fileID}`;
      this.absolutePurchaseURL = `${location.origin}${this.purchaseURL}`;
    },
    onPriceChange() {
      console.log(this.price);
      if (this.exchangeRate)
        this.priceSuffix = (this.price * this.exchangeRate).toFixed(2) + " ZAR";
    }
  }
};
</script>

<style>
.msg {
  padding: 10px;
}

.upload {
  margin-top: -60px;
  background: url(../assets/berg.jpg);
}
</style>
