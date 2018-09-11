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
        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
import web3 from '@/web3';
import FileUpload from '@/components/FileUpload.vue';
import axios from 'axios';

export default {
	name: 'Upload',
	components: {
		'file-upload': FileUpload
	},
	created() {},
	data() {
		return {
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
		submit() {
			const formData = new FormData();
			formData.append('primary', this.files.primary, 'primary');
			formData.append('preview', this.files.preview, 'preview');
			const claimAmountInWei = web3.utils.toWei(this.amount, this.unit);
			console.log(claimAmountInWei);
			formData.append('price', claimAmountInWei);
			console.log('submit');
			console.log(this.files.primary);
			console.log(this.files.preview);
			console.log(formData);
			axios
				.post('http://localhost:8080/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(function(res) {
					console.log(res);
					console.log('SUCCESS!!');
				})
				.catch(function() {
					console.log('FAILURE!!');
				});
		}
	}
};
</script>
