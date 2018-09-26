<template>
  <v-app>
    <v-card
    color="grey lighten-4"
    flat
    >
  <v-toolbar color="grey darken-1" dark>
    <v-spacer></v-spacer>
    <v-btn
      outline color="white"
      :loading="loading3"
      :disabled="loading3"
      class="white--text"
      to="/"
      @click.native="loader = 'loading3'"
    >
      Upload
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
    <v-btn
      outline color="white"
      :loading="loading3"
      :disabled="loading3"
      class="white--text"
      to ='/files'
      @click.native="loader = 'loading3'"
    >
      Files
      <v-icon right dark>file_copy</v-icon>
    </v-btn>



  </v-toolbar>
</v-card>
    <router-view/>
  </v-app>
</template>

<script>
import web3 from './web3';
import instance from './contractInstance';
import '@/ipfs';

export default {
	name: 'app'
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
