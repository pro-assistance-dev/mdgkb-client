// eslint-disable-next-line simple-import-sort/imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setupElementPlusComponents, setupElementPlusPlugins } from '@/plugins/ElementPlus';

import 'dayjs/locale/ru';
import './assets/styles/element-variables.scss';

import locale from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/ru';
import sanitizeHTML from 'sanitize-html';
import { useStore } from 'vuex';

import fillDateFormat from '@/services/DateFormat';

const app = createApp(App);

app.config.globalProperties.$dateFormatRu = fillDateFormat;
app.config.globalProperties.$store = useStore();
app.config.globalProperties.$sanitize = sanitizeHTML;
app.use(store);
app.use(router);
app.use(setupElementPlusComponents);
app.use(setupElementPlusPlugins);

locale.use(lang);

router.isReady().then(() => {
  app.mount('#app');
});
