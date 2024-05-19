<template>
  <div v-if="mounted">
    <AdaptiveContainer :menu-width="'300px'" :mobile-width="'768px'">
      <template v-if="!page.id && !page.pageSideMenus.length" #main>
        <CustomPage />
      </template>
      <template v-if="pageSideMunusExists()" #menu>
        <slot name="bottom" />
        <PInput v-model="page.filterStr" />
        <PageSideMenuComponent :page="page" @select-menu="selectMenu" @close="(e) => (close = e)" />
      </template>

      <template v-if="pageSideMunusExists()" #icon>
        <svg class="icon-right-menu">
          <use xlink:href="#right-menu"></use>
        </svg>
      </template>
      <template v-if="pageSideMunusExists()" #title>
        <div class="title-in">
          {{ page.title ? page.title : title }}
          <slot name="title" />
        </div>
      </template>
      <template v-if="pageSideMunusExists()" #body>
        <div class="body-in">
          <ContactsBlock v-if="selectedMenu.id == 'contacts' && page.showContacts" :contact="page.contact" full />
          <PageSection v-else :title="selectedMenu.name" :description="description" :page-sections="sections"
            :collaps="page.collaps" :show-content="selectedMenu.showContent" />
          <slot v-for="component in customSections.filter((c) => c.id === selectedMenu.id)" :key="component.id"
            :name="component.id" />
        </div>
      </template>
    </AdaptiveContainer>
  </div>
  <RightMenu />
</template>

<script lang="ts" setup>
import { onBeforeRouteLeave } from 'vue-router';
import Strings from '@/services/Strings'
import RightMenu from '@/assets/svg/Main/RightMenu.svg';
import CustomSection from '@/classes/CustomSection';
import AdaptiveContainer from '@/components/Base/AdaptiveContainer.vue';
import ContactsBlock from '@/components/ContactsBlock.vue';
import CustomPage from '@/components/CustomPage.vue';
import PageSection from '@/components/Page/PageSection.vue';
import PageSideMenuComponent from '@/components/Page/PageSideMenu.vue';
import Page from '@/services/classes/page/Page';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
const props = defineProps({
  customSections: {
    type: Array as PropType<CustomSection[]>,
    default: () => [],
  },
  getPage: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  title: {
    type: String as PropType<string>,
    default: '',
  },
})
const emits = defineEmits(['selectMenu'])
const page: ComputedRef<Page> = computed(() => Provider.store.getters['pages/item']);
const path = computed(() => Provider.route().path);
const selectedMenu: Ref<PageSideMenu> = ref(new PageSideMenu());
const sections = computed(() => selectedMenu.value.getPageSections(page.value.filterStr))
const description = computed(() => {
  return Strings.SearchIn(selectedMenu.value.description, page.value.filterStr) ? selectedMenu.value.description : ""
})
const mounted = ref(false);

const pageSideMunusExists = () => {
  return (!props.getPage || page.value.id) && page.value.pageSideMenus.length
}

const load = async () => {
  Provider.store.commit('pages/resetItem');
  mounted.value = false;
  if (props.getPage) {
    await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
  }
  page.value.addCustomSectionsToSideMenu(props.customSections);
  mounted.value = true;
};

let redirect = false;
onBeforeRouteLeave(() => {
  redirect = true;
});
watch(path, async () => {
  if (!redirect) {
    await load();
  }
});
Hooks.onBeforeMount(load);

const selectMenu = (e: PageSideMenu): void => {
  selectedMenu.value = e;
  emits('selectMenu', e);
};

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/ordinatura.scss';
@import '@/assets/styles/base-style.scss';
$content-max-width: 1000px;
$card-margin-size: 30px;

.page-container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}

.icon-right-menu {
  width: 32px;
  height: 32px;
  fill: #343e5c;
  cursor: pointer;
  stroke: #ffffff;
  animation-name: ripple;
  animation-duration: 2s;
  animation-delay: 2s;
}

.title-in {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  font-size: 24px;
  color: #343d5c;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  padding: 25px;
}

@keyframes ripple {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 1024px) {
  .page-container {
    display: block;
    width: 100%;
  }

  .title-in {
    width: calc(100% - 120px);
    padding: 25px 60px;
  }
}

@media screen and (max-width: 768px) {
  .title-in {
    font-size: 20px;
  }
}

@media screen and (max-width: 500px) {
  .title-in {
    width: calc(100% - 75px);
    font-size: 16px;
    padding: 15px 15px 15px 60px;
  }

  .body-in {
    max-height: calc(100% - 30px);
    width: calc(100% - 30px);
    padding: 15px;
  }
}
</style>
