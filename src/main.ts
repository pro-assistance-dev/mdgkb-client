// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';

import 'dayjs/locale/ru';
import './assets/styles/element-variables.scss';

import sanitizeHTML from 'sanitize-html';
import { useStore } from 'vuex';

import fillDateFormat from '@/services/DateFormat';

const app = createApp(App);
import VueSocialSharing from 'vue-social-sharing';

app.config.globalProperties.$dateFormatRu = fillDateFormat;
app.config.globalProperties.$store = useStore();
app.config.globalProperties.$sanitize = sanitizeHTML;

app.use(VueSocialSharing);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faVk);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.use(store);
app.use(router);
app.use(setupElementPlusComponents);
app.use(setupElementPlusPlugins);

// locale.use(lang);

router.isReady().then(() => {
  app.mount('#app');
});
