<template>
  <PageComponent v-if="mounted" :custom-sections="customSections" :get-page="false" title="Партнёры"
    @select-menu="setPartner">
    <template v-for="section in customSections" :key="section" #[section.id]>
      <component :is="section.component"></component>
    </template>
  </PageComponent>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import CustomSection from '@/classes/CustomSection';
import Partner from '@/classes/Partner';
import PartnerType from '@/classes/PartnerType';
import PageComponent from '@/components/Page/PageComponent.vue';
import PartnersList from '@/components/Partners/PartnersList.vue';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PartnersPage',
  components: { PageComponent, PartnersList },

  setup() {
    const partners: ComputedRef<Partner[]> = computed(() => Provider.store.getters['partners/items']);
    const partnerTypes: ComputedRef<PartnerType[]> = computed(() => Provider.store.getters['partnerTypes/items']);

    const customSections: Ref<CustomSection[]> = ref([]);
    const mounted = ref(false);

    const setPartner = (e: PageSideMenu) => {
      Provider.store.commit(
        'partnerTypes/set',
        partnerTypes.value.find((pt: PartnerType) => pt.id === e.id)
      );
      Provider.store.commit(
        'partners/setFilteredItems',
        partners.value.filter((item: Partner) => item.partnerType?.id == e.id)
      );
    };

    const load = async () => {

      await Store.GetAll('partnerTypes');
      await Store.GetAll('partners');
      const sections = partnerTypes.value.map((p: PartnerType) => CustomSection.Create(p.id as string, p.name, 'PartnersList'));
      customSections.value.push(...sections);
      mounted.value = true;
    };

    onBeforeMount(load);

    return {
      customSections,
      partners,
      partnerTypes,
      setPartner,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
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
