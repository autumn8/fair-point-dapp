<template>
  <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <div v-for="card in cards" v-bind:key="card._id">
              <v-card router :to="`/purchase/${card._id}`">
                <v-img
                  class='file-image'
                  :src="'http://ipfs.io/ipfs/' + card.thumbNailHash"
                  height="250px"
                  width = "250px"
                >
                  <!-- <v-container
                    fill-height
                    fluid
                    pa-2
                  > -->
                    <!-- <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout> -->
                  <!-- </v-container> -->
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-layout>
        </v-container>
</template>

<script>
import { getAllFiles } from '@/fairPointService';
import { __ } from '@/utils';
import errorMessages from '@/errorMessages';

export default {
	data() {
		return {
			cards: []
		};
	},
	async created() {
		const filesResponse = await __(getAllFiles());
		if (filesResponse.error) {
			this.formError = true;
			this.msg = errorMessages.ERROR_ON_RETRIEVING_IMAGES;
			this.isSending = false;
			return;
		}
		console.log('we have results');
		console.log(filesResponse.data);
		this.cards = filesResponse.data.data;
		console.log(this.cards);
	}
};
</script>

<style>
.file-image {
	padding: 10px 0 0 10px;
}
</style>
