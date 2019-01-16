import Vue from 'vue';
import Router from 'vue-router';
import Upload from '@/views/Upload.vue';
import Purchase from '@/views/Purchase.vue';
import Files from '@/views/Files.vue';
import Error from '@/views/Error.vue';
import store from '@/store.js';

Vue.use(Router);

function hasInitialized(to, from, next) {
	if (!store.state.hasInitialized) {
		console.error('not initiliazed');
		return;
	} else {
		console.log('go to router');
		next();
	}
}

export default new Router({
	routes: [
		{
			path: '/upload',
			name: 'upload',
			component: Upload,
			beforeEnter: hasInitialized
		},
		{
			path: '/purchase/:id',
			name: 'purchase',
			component: Purchase,
			beforeEnter: hasInitialized
		},
		{
			path: '/files',
			name: 'files',
			component: Files,
			beforeEnter: hasInitialized
		},
		{
			path: '/error',
			name: 'error',
			component: Error
		}
	]
});
