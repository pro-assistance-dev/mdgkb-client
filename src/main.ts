// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';
import ru from 'element-plus/es/locale/lang/ru';

import 'dayjs/locale/ru';
import './assets/styles/element-variables.scss';

import sanitizeHTML from 'sanitize-html';
import { useStore } from 'vuex';

import scroll from '@/services/Scroll';

const app = createApp(App);
import VueSocialSharing from 'vue-social-sharing';
import YmapPlugin from 'vue-yandex-maps';

app.config.globalProperties.$dateTimeFormatter = new DateTimeFormatter('ru-RU');
app.config.globalProperties.$store = useStore();
app.config.globalProperties.$sanitize = sanitizeHTML;
app.config.globalProperties.$scroll = scroll;
app.config.globalProperties.$buildUrl = buildUrl;

app.use(VueSocialSharing);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import buildUrl from '@/services/BuildUrl';
import DateTimeFormatter from '@/services/DateFormat';
import Provider from '@/services/Provider';

library.add(faVk);

app.component('FontAwesomeIcon', FontAwesomeIcon);

// const settings = {
//   apiKey: '',
//   lang: 'ru_RU',
//   coordorder: 'latlong',
//   enterprise: false,
//   version: '2.1',
// };

app.use(store);
app.use(router);
app.use(YmapPlugin);
app.use(setupElementPlusComponents, { locale: ru });
app.use(setupElementPlusPlugins);

// locale.use(lang);
Provider.router = router;
Provider.store = store;
router.isReady().then(() => {
  app.mount('#app');
});
