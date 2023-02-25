<template>
  <VerticalPageWrapper :title="title">
    <template #menu>
      <PartnersMenu :partner-types="partnerTypes" @load="setPartner" />
    </template>
    <PartnersList :partners="currentPartners" :partner-type="currentType" />
  </VerticalPageWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import PartnerType from '@/classes/partners/PartnerType';
import PartnersList from '@/components/Partners/PartnersList.vue';
import PartnersMenu from '@/components/Partners/PartnersMenu.vue';
import VerticalPageWrapper from '@/components/VerticalPageWrapper.vue';
import IPartner from '@/interfaces/partners/IPartner';
import IPartnerType from '@/interfaces/partners/IPartnerType';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PartnersPage',
  components: { PartnersList, VerticalPageWrapper, PartnersMenu },

  setup() {
    const store = useStore();
    const partners: ComputedRef<IPartner[]> = computed(() => Provider.store.getters['partners/items']);
    const partnerTypes: ComputedRef<IPartnerType[]> = computed(() => Provider.store.getters['partnerTypes/items']);
    const currentPartners: Ref<IPartner[]> = ref([]);
    const currentType: Ref<IPartnerType> = ref(new PartnerType());

    const setPartner = (partnerType: IPartnerType) => {
      currentPartners.value = partners.value.filter((item: IPartner) => item.partnerType?.id == partnerType.id);
      currentType.value = partnerType;
    };

    const load = async () => {
      await store.dispatch('partnerTypes/getAll');
      await store.dispatch('partners/getAll');
      setPartner(partnerTypes.value[0]);
    };

    Hooks.onBeforeMount(load);

    return {
      partners,
      partnerTypes,
      currentPartners,
      setPartner,
      currentType,
      mounted: Provider.mounted,
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
