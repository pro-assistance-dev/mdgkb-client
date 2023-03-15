<template>
  <div v-if="mounted">
    <AdaptiveContainer :menu-width="'300px'" :mobile-width="'1330px'" :horizontal="true">
      <template v-if="!page.id && !page.pageSideMenus.length" #main>
        <CustomPage />
      </template>
      <template v-if="page.id && page.pageSideMenus.length" #menu>
        <PageSideMenuComponent :page="page" @select-menu="(e) => (selectedMenu = e)" @close="(e) => (close = e)" />
      </template>

      <template v-if="page.id && page.pageSideMenus.length" #icon>
        <svg class="icon-right-menu">
          <use xlink:href="#right-menu"></use>
        </svg>
      </template>
      <template v-if="page.id && page.pageSideMenus.length" #title>
        <div class="title-in">{{ page.title }}</div>
      </template>
      <template v-if="page.id && page.pageSideMenus.length" #body>
        <div class="body-in">
          <ContactsBlock v-if="selectedMenu.id == 'contacts' && page.showContacts" :contact-info="page.contactInfo" full />
          <PageSection
            v-else
            :title="selectedMenu.name"
            :description="selectedMenu.description"
            :page-sections="selectedMenu.pageSections"
            :collaps="page.collaps"
            :show-content="selectedMenu.showContent"
          />
          <slot v-for="component in customSections.filter((c) => c.id === selectedMenu.id)" :key="component.id" :name="component.id" />
        </div>
      </template>
    </AdaptiveContainer>
  </div>
  <RightMenu />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import RightMenu from '@/assets/svg/Main/RightMenu.svg';
import CustomSection from '@/classes/CustomSection';
import AdaptiveContainer from '@/components/Base/AdaptiveContainer.vue';
import ContactsBlock from '@/components/ContactsBlock.vue';
import CustomPage from '@/components/CustomPage.vue';
import PageSection from '@/components/Page/PageSection.vue';
import PageSideMenuComponent from '@/components/Page/PageSideMenuV2.vue';
import Page from '@/services/classes/page/Page';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PageComponent',
  components: {
    PageSideMenuComponent,
    PageSection,
    CustomPage,
    ContactsBlock,
    AdaptiveContainer,
    RightMenu,
  },
  props: {
    customSections: {
      type: Array as PropType<CustomSection[]>,
      default: () => [],
    },
  },
  emins: ['selectMenu'],
  setup(props, { emit }) {
    const page: ComputedRef<Page> = computed(() => Provider.store.getters['pages/item']);
    const path = computed(() => Provider.route().path);
    const selectedMenu: Ref<PageSideMenu> = ref(new PageSideMenu());
    const mounted = ref(false);

    const load = async () => {
      mounted.value = false;
      await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
      page.value.addCustomSectionsToSideMenu(props.customSections);
      mounted.value = true;
      emit;
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

    return {
      mounted,
      page,
      selectedMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
@import '@/assets/styles/elements/base-style.scss';
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
