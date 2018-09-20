<template>
    <v-container fluid fill-height>
      <v-layout  align-center justify-center>
        <v-flex xs8>
          <v-card class="elevation-12">
            <v-card-text>
                <v-form ref="form">
                  <file-upload v-model="files.primary" message="Select file available for purchase"/>
                  <file-upload v-model="files.preview" message="Select low-res preview file"/>
                  <v-layout  row wrap>
                    <v-flex xs8>
                      <v-text-field
                          label="Price"
                          prepend-icon="euro_symbol"
                          v-model="amount"
                          required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-select v-model="ethUnit" :items="items" label="Currency Unit" required>
                      <!-- <v-select :disabled="isFormSending"
                          prepend-icon="aspect_ratio"
                          v-model="ethUnit"
                          :rules="unitRules"
                          :items="items"
                          label="Curreny Unit"
                          required> -->
                    </v-select>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submit()" >

                <!-- primary
                :disabled="!valid"
                :loading="isSending"
                @click="submit"> -->
              Send
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-container>
            <p>This is the link to your purchase page:</p>
          <v-btn v-if="purchaseURL" router :to="purchaseURL" flat>
                  {{absolutePurchaseURL}}
          </v-btn>
        </v-container>
        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
import web3 from '@/web3';
import FileUpload from '@/components/FileUpload.vue';
import axios from 'axios';
import { sendForm, addFileToContract } from '@/utils';

export default {
	name: 'Upload',
	components: {
		'file-upload': FileUpload
	},
	created() {},
	data() {
		return {
			purchaseURL: undefined,
			amount: 0,
			items: ['Wei', 'Ether'],
			ethUnit: '',
			unitRules: [v => !!v || 'Currency unit is required'],
			files: {
				primary: undefined,
				preview: undefined
			}
		};
	},
	methods: {
		async submit() {
			sendForm(this.files.primary, this.files.preview)
				.then(async res => {
					console.log(res);
					addFileToContract(res.data._id, this.amount, this.ethUnit)
						.then(receipt => {
							console.log(receipt);
							this.purchaseURL = `/purchase/${res.data._id}`;
							this.absolutePurchaseURL = `${location.origin}${
								this.purchaseURL
							}`;
							console.log(this.purchaseURL);
							console.log('SUCCESS!!');
						})
						.catch(error => {
							console.log('caught error');
							console.log(error);
						});
					console.log('SUCCESS!!');
				})
				.catch(function(err) {
					console.log('FAILURE!!');
					console.log(err);
				});
		}
	}
};
</script>
