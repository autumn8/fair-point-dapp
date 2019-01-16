import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import { createWeb3Instance } from './web3';
import { createContractInstance } from './contractInstance';
import { __ } from '@/utils';
let hasInitialized = false;

Vue.config.productionTip = false;

function init() {
	console.log('init');
	const web3 = createWeb3Instance()
		.then(data => createContractInstance(data))
		.then(_ => {
			console.log('initialized');
			store.commit('initialize');
			router.push('upload');
		})
		.catch(error => {
			router.push('error');
			console.error('An error occurred');
			console.error(error);
		});
}

init();

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');
