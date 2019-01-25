import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import { createWeb3Instance } from './web3';
import { createContractInstance } from './contractInstance';
import { __ } from '@/utils';

Vue.config.productionTip = false;

function init() {
	console.log('init');
	//TODO handle web3 and contract instance errors
	createWeb3Instance()
		.then(async web3 => {
			store.commit('web3', web3);	
								
			return createContractInstance(web3);
		})
		.then(contractInstance => {
			console.log(contractInstance);
			store.commit('contractInstance', contractInstance);

			console.log('initialized');
			store.commit('initialize');
			router.push('upload');			
			store.state.contractInstance.events.FilePurchased({				
				fromBlock: 0
			})
			.on('data', function(event){				
				console.log(event); // same results as the optional callback above
			})
			.on('error', console.error);

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
