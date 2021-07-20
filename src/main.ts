import { createApp } from 'vue';
import App from './App.vue';
import 'dayjs/locale/ru';
import router from './router';
import store from './store';
import './assets/styles/element-variables.scss';

import {
  ElAffix,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInfiniteScroll,
  ElInput,
  ElInputNumber,
  ElLoading,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElOption,
  ElPagination,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSpace,
  ElSubmenu,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTree,
  ElUpload,
  ElCalendar,
  ElCollapseTransition,
} from 'element-plus';

const components = [
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElAffix,
  ElButton,
  ElButtonGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCheckbox,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElPopover,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSubmenu,
  ElSpace,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTree,
  ElUpload,
  ElRadio,
  ElDescriptions,
  ElDescriptionsItem,
  ElPagination,
  ElCalendar,
  ElCollapseTransition,
];
const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification, ElInfiniteScroll];
const app = createApp(App);

import locale from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/ru';
import fillDateFormat from '@/services/DateFormat';
import { useStore } from 'vuex';

app.config.globalProperties.$dateFormatRu = fillDateFormat;
app.config.globalProperties.$store = useStore();

app.use(store);
app.use(router);

components.forEach((component) => {
  app.component(component.name, component);
});
plugins.forEach((plugin) => {
  app.use(plugin);
});

locale.use(lang);

app.mount('#app');
