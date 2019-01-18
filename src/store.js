import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hasInitialized: false,
		web3: null,
		contractInstance: null
	},
	mutations: {
		initialize(state) {
			console.log('init state mutation');
			state.hasInitialized = true;
		},
		web3(state, payload) {
			state.web3 = payload
		},
		contractInstance(state, payload) {
			state.contractInstance = payload
		}

	},
	actions: {}
});
