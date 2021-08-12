import 'dayjs/locale/ru';
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
  ElCalendar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
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
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSpace,
  ElSubmenu,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElTag,
  ElTimeline,
  ElTimelineItem,
  ElTimeSelect,
  ElTooltip,
  ElTree,
  ElUpload,
} from 'element-plus';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

const components = [
  ElAffix,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  ElCalendar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckTag,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
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
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSpace,
  ElSubmenu,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTag,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTree,
  ElUpload,
  ElColorPicker,
  ElTimeSelect,
  ElCheckboxButton,
];
const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification];
const app = createApp(App);

import locale from 'element-plus/lib/locale';
import lang from 'element-plus/lib/locale/lang/ru';
import sanitizeHTML from 'sanitize-html';
import { useStore } from 'vuex';

import fillDateFormat from '@/services/DateFormat';

app.config.globalProperties.$dateFormatRu = fillDateFormat;
app.config.globalProperties.$store = useStore();
app.config.globalProperties.$sanitize = sanitizeHTML;
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
