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
