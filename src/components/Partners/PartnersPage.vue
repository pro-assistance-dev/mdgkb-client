<template>
  <PageComponent v-if="mounted" :custom-sections="customSections" :get-page="false" title="Партнёры">
    <template v-for="section in customSections" :key="section.id" #[section.id]>
      <component :is="section.component"></component>
    </template>
  </PageComponent>
</template>

<script lang="ts" setup>
import CustomSection from '@/classes/CustomSection';
// import Partner from '@/classes/Partner';
// import PartnerType from '@/classes/PartnerType';
// const partners: Partner[] = PartnersStore.Items();
// const partnerTypes: PartnerType[] = PartnersTypesStore.Items();

const customSections: Ref<CustomSection[]> = ref([]);
const mounted = ref(false);

// const load = async () => {
//   await PartnersTypesStore.GetAll();
//   await PartnersStore.GetAll();
//   const sections = partnerTypes.map((p: PartnerType) => CustomSection.Create(p.id as string, p.name, 'PartnersList'));
//   customSections.value.push(...sections);
//   mounted.value = true;
// };
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$side-cotainer-max-width: 300px;
$content-max-width: 1000px;
$card-margin-size: 30px;

.partner-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.el-menu {
  margin-right: 10px;
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

:deep(.cell-row) {
  padding: 0 !important;
  cursor: pointer;
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}

:deep(.el-menu-item) {
  background: #ffffff;
  font-size: 14px !important;
  border-bottom: solid 1px var(--el-menu-border-color);
}

:deep(.el-menu) {
  margin-right: 0;
  border-right: none;
}
</style>
