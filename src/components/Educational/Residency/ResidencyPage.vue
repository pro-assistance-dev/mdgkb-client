<template>
  <PageComponent :custom-sections="customSections">
    <template v-for="section in customSections" :key="section" #[section.id]>
      <component :is="section.component"></component>
    </template>
  </PageComponent>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import CustomSection from '@/classes/CustomSection';
import ResidencyCourses from '@/components/Educational/Residency/ResidencyCourses.vue';
import PageComponent from '@/components/Page/PageComponent.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ResidencyPage',
  components: {
    PageComponent,
    ResidencyCourses,
  },
  setup() {
    const customSections: Ref<CustomSection[]> = ref([]);

    Hooks.onBeforeMount(() => {
      customSections.value.push(
        CustomSection.Create('courses', 'Программы', 'ResidencyCourses')
        // CustomSection.Create('contacts', 'Контакты', 'ResidencyContacts')
      );
    });

    return {
      customSections,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';

:deep(.main-box) {
  margin: 0px !important;
}

:deep(.page-container) {
  background: #f6f6f6 !important;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 14px;
  font-weight: normal;
  color: #343e5c;
}

h3 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 16px;
  font-weight: normal;
  color: #343e5c;
}
</style>
