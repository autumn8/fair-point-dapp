<template>
  <v-app>

  <v-toolbar class="app-toolbar"  dark>
    <v-toolbar-title>FAIR POINT</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      outline color="white"
      class="white--text"
      to="/"
    >
      Upload
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
    <v-btn
      outline color="white"
      class="white--text"
      to ='/files'
    >
      Files
      <v-icon right dark>file_copy</v-icon>
    </v-btn>



  </v-toolbar>

    <router-view/>
  </v-app>
</template>

<script>
import web3 from './web3';
import instance from './contractInstance';
import '@/ipfs';

export default {
	name: 'app',
	created() {
		console.log(process.env);
	}
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

.app-toolbar {
	opacity: 0.5;
}
</style>
