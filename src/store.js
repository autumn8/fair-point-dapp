import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		hasInitialized: false
	},
	mutations: {
		initialize(state) {
			console.log('init state mutation');
			state.hasInitialized = true;
		}
	},
	actions: {}
});
