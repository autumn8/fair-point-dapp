<template>
  <div>
    <v-container>
      <v-card>
    <v-img
                  :src="src"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                </v-img>
    Purchase file: {{$route.params.id}}    
    <p>{{price}}</p>
  </v-card>
</v-container>
  </div>
</template>
<script>
import axios from 'axios';
export default {
	data() {
		return {
			src: '',
			price: 0
		};
	},
	created() {
		axios
			.get(`http://localhost:8080/purchase/${this.$route.params.id}`)
			.then(res => {
				console.log(res.data);
				this.src = `http://ipfs.io/ipfs/${res.data.previewHash}`;
				this.price = res.data.price;
				console.log('SUCCESS!!');
			})
			.catch(function() {
				console.log('FAILURE!!');
			});
	}
};
</script>
