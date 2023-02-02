<template>
  <div v-if="mounted">
    <div v-if="page.pageSideMenus.length" class="page-container">
      <PageSideMenuComponent :page="page" />
      <div class="content-container">
        <PageSection
          :title="page.getSelectedSideMenu().name"
          :description="page.getSelectedSideMenu().description"
          :page-sections="page.getSelectedSideMenu().pageSections"
        />
        <slot
          v-for="component in customSections.filter((c) => c.id === page.getSelectedSideMenu().id)"
          :key="component.id"
          :name="component.id"
        />
      </div>
    </div>
    <CustomPage v-else />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, watch } from 'vue';

import Page from '@/classes/page/Page';
import CustomPage from '@/components/CustomPage.vue';
import PageSection from '@/components/Page/PageSection.vue';
import PageSideMenuComponent from '@/components/Page/PageSideMenu.vue';
import ICustomSection from '@/interfaces/ICustomSection';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'PageComponent',
  components: {
    PageSideMenuComponent,
    PageSection,
    CustomPage,
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

    const load = async () => {
      await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
      page.value.addCustomSectionsToSideMenu(props.customSections);
    };

    watch(path, load);
    Hooks.onBeforeMount(load);

    return {
      page,
      mounted: Provider.mounted,
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
