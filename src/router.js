import Vue from 'vue';
import Router from 'vue-router';
import Upload from './views/Upload.vue';
import Purchase from './views/Purchase.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/upload',
			name: 'upload',
			component: Upload
		},
		{
			path: '/purchase',
			name: 'purchase',
			component: Purchase
		}
	]
});