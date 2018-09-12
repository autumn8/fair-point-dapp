import Vue from 'vue';
import {
	Vuetify,
	VApp,
	VNavigationDrawer,
	VFooter,
	VList,
	VBtn,
	VIcon,
	VGrid,
	VCard,
	VToolbar,
	VSelect,
	VTextField,
	VForm,
	VImg,
	transitions
} from 'vuetify';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
	components: {
		VApp,
		VNavigationDrawer,
		VFooter,
		VList,
		VBtn,
		VIcon,
		VGrid,
		VCard,
		VTextField,
		VForm,
		VImg,
		VToolbar,
		VSelect,
		transitions
	}
});
