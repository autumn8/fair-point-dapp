<template>
  <div id="app">
    <div id="nav">
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/purchase">Purchase</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import web3 from './web3';
import instance from './contractInstance';

export default {
	name: 'app',
	components: {
		HelloWorld
	},
	async mounted() {
		const accounts = await web3.eth.getAccounts();
		const from = accounts[0];
		const price = web3.utils.toWei('0.4', 'ether');
		const ipfsHash =
			'0xc831f48ff2c0a3ffa70380f2bff05f29f37486d896b306dccda29bfb66c866dd';
		const tx = await instance.methods.addFile(ipfsHash, price).send({
			from,
			gas: '1000000'
		});
		console.log(tx);

		const file = await instance.methods.files(ipfsHash).call({ from });
		console.log(file);
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
	margin-top: 60px;
}
</style>
