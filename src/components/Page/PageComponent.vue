<template>
  <div v-if="mounted" class="page-container">
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
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import PageSection from '@/components/Page/PageSection.vue';
import PageSideMenuComponent from '@/components/Page/PageSideMenu.vue';
import ICustomSection from '@/interfaces/ICustomSection';
import IPage from '@/interfaces/page/IPage';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'PageComponent',
  components: {
    PageSideMenuComponent,
    PageSection,
  },
  props: {
    customSections: {
      type: Array as PropType<ICustomSection[]>,
      default: () => [],
    },
  },
  setup(props) {
    const page: ComputedRef<IPage> = computed(() => Provider.store.getters['pages/page']);
    const mounted: Ref<boolean> = ref(false);

    onBeforeMount(async () => {
      await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
      page.value.addCustomSectionsToSideMenu(props.customSections);
      mounted.value = true;
    });

    return {
      page,
      mounted,
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
