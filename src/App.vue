<template>
  <v-app>

    <router-view/>
  </v-app>
</template>

<script>
import web3 from './web3';
import instance from './contractInstance';
import '@/utils';

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
