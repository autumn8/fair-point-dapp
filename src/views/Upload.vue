<template>

    <v-container grid-list-md text-xs-center>
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
                      <v-select v-model="unit" :items="items" label="Currency Unit" required>
                      <!-- <v-select :disabled="isFormSending"
                          prepend-icon="aspect_ratio"
                          v-model="unit"
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
                  {{purchaseURL}}
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
import { sendForm } from '@/utils';
import contractInstance from '@/contractInstance';
import { getBytes32FromIpfsHash } from '@/ipfsHashConversion';

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
			unit: '',
			unitRules: [v => !!v || 'Currency unit is required'],
			files: {
				primary: undefined,
				preview: undefined
			}
		};
	},
	methods: {
		async submit() {
			const accounts = await web3.eth.getAccounts();
			const price = await web3.utils.toWei(this.amount, this.unit);
			sendForm(this.files.primary, this.files.preview, price)
				.then(async res => {
					const bytes32 = getBytes32FromIpfsHash(res.data.primaryHash);
					const tx = await contractInstance.methods
						.addFile(bytes32, price)
						.send({
							from: accounts[0],
							gas: '1000000'
						});
					const file = await contractInstance.methods
						.files(bytes32)
						.call({ from: accounts[0] });
					console.log(file);

					this.purchaseURL = `/purchase/${res.data.primaryHash}`;
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
