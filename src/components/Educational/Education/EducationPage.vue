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
import StructurePage from '@/components/Educational/Education/StructurePage.vue';
import PageComponent from '@/components/Page/PageComponent.vue';
import Hooks from '@/services/Hooks/Hooks';

export default defineComponent({
  name: 'EducationPage',
  components: {
    StructurePage,
    PageComponent,
  },
  setup() {
    const customSections: Ref<CustomSection[]> = ref([]);

    Hooks.onBeforeMount(() => {
      customSections.value.push(CustomSection.Create('structure', 'Структура и орган управления организацией', 'StructurePage', 1));
    });

    return {
      customSections,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/ordinatura.scss';
$side-cotainer-max-width: 300px;
$content-max-width: 1000px;
$card-margin-size: 30px;

.menu-item {
  padding: 10px 0;
}

h4 {
  margin: 0;
}
.el-divider {
  margin: 10px 0 0;
}
:deep(.cell) {
  padding: 0 !important;
}
:deep(.cell-row) {
  padding: 0 !important;
  cursor: pointer;
}
.ordinatura-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}
.is-active {
  color: #42a4f5;
}
</style>
