// eslint-disable-next-line simple-import-sort/imports
// import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';
import 'dayjs/locale/ru';
import './assets/styles/element-variables.scss';
import './assets/styles/base-style.scss';

import sanitizeHTML from 'sanitize-html';
import { createApp } from 'vue';
import VueSocialSharing from 'vue-social-sharing';

import carouselSwipe from '@/services/CarouselSwipe';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import scroll from '@/services/Scroll';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
// import YmapPlugin from 'vue-yandex-maps';
import Vue3TouchEvents from 'vue3-touch-events';

app.config.globalProperties.$classHelper = ClassHelper;
app.config.globalProperties.$dateTimeFormatter = new DateTimeFormatter('ru-RU');
app.config.globalProperties.$sanitize = sanitizeHTML;
app.config.globalProperties.$scroll = scroll;
app.config.globalProperties.$carouselSwipe = carouselSwipe;
app.config.globalProperties.$dataTypes = DataTypes;
app.config.globalProperties.$operators = Operators;

app.use(VueSocialSharing);
app.use(Vue3TouchEvents);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Maska from 'maska';

import ClassHelper from '@/services/ClassHelper';
import DateTimeFormatter from '@/services/DateFormat';
library.add(faVk);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.use(store);
app.use(router);
// app.use(YmapPlugin);
// app.use(setupElementPlusComponents, { locale: ru });
// app.use(setupElementPlusPlugins);
app.use(Maska);
// locale.use(lang);

// PHelp.Auth.SetUserConstru
router.isReady().then(() => {
  app.mount('#app');
});
export function getStore() {
  return store;
}
