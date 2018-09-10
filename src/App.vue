<template>
  <v-app>
    <div id="nav">
      <v-btn router to="/upload" flat>
        <v-icon>payment</v-icon>
        Upload files
      </v-btn>
      <v-btn router to="/purchase" flat>
        <v-icon>assessment</v-icon>
        Buy a file
      </v-btn>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import web3 from './web3';
import instance from './contractInstance';

export default {
	name: 'app',
	async mounted() {
		// const accounts = await web3.eth.getAccounts();
		// const from = accounts[0];
		// const price = web3.utils.toWei('0.4', 'ether');
		// const ipfsHash =
		// 	'0xc831f48ff2c0a3ffa70380f2bff05f29f37486d896b306dccda29bfb66c866dd';
		// const tx = await instance.methods.addFile(ipfsHash, price).send({
		// 	from,
		// 	gas: '1000000'
		// });
		// console.log(tx);
		//
		// const file = await instance.methods.files(ipfsHash).call({ from });
		// console.log(file);
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
</style>
