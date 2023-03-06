<template>
  <div v-if="mounted">
    <div v-if="page.id && page.pageSideMenus.length" class="page-container">
      <PageSideMenuComponent :page="page" @select-menu="(e) => (selectedMenu = e)" />
      <div class="content-container">
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
    </div>
    <CustomPage v-else />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, PropType, Ref, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import Page from '@/classes/page/Page';
import PageSideMenu from '@/classes/PageSideMenu';
import ContactsBlock from '@/components/ContactsBlock.vue';
import CustomPage from '@/components/CustomPage.vue';
import PageSection from '@/components/Page/PageSection.vue';
import PageSideMenuComponent from '@/components/Page/PageSideMenu.vue';
import ICustomSection from '@/interfaces/ICustomSection';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PageComponent',
  components: {
    PageSideMenuComponent,
    PageSection,
    CustomPage,
    ContactsBlock,
  },
  props: {
    customSections: {
      type: Array as PropType<ICustomSection[]>,
      default: () => [],
    },
  },
  setup(props) {
    const page: ComputedRef<Page> = computed(() => Provider.store.getters['pages/item']);
    const path = computed(() => Provider.route().path);
    const selectedMenu: Ref<PageSideMenu> = ref(new PageSideMenu());
    const mounted = ref(false);

    const load = async () => {
      mounted.value = false;
      await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
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
$content-max-width: 1000px;
$card-margin-size: 30px;

.page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}
.is-active {
  color: #42a4f5;
}
</style>
