<template>
  <div class="partner-page-container">
    <el-menu default-active="0">
      <el-menu-item v-for="(item, index) in partnerTypes" :key="item.id" :index="String(index)" @click="setPartner(item)">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <PartnersList :partners="currentPartners" :partner-type="currentType" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import PartnerType from '@/classes/partners/PartnerType';
import PartnersList from '@/components/Partners/PartnersList.vue';
import IPartner from '@/interfaces/partners/IPartner';
import IPartnerType from '@/interfaces/partners/IPartnerType';

export default defineComponent({
  name: 'PartnersPage',
  components: { PartnersList },

  setup() {
    const store = useStore();
    const partners: ComputedRef<IPartner[]> = computed(() => store.getters['partners/items']);
    const partnerTypes: ComputedRef<IPartnerType[]> = computed(() => store.getters['partnerTypes/items']);
    const currentPartners: Ref<IPartner[]> = ref([]);
    const currentType: Ref<IPartnerType> = ref(new PartnerType());

    const setPartner = (partnerType: IPartnerType) => {
      currentPartners.value = partners.value.filter((item: IPartner) => item.partnerType?.id == partnerType.id);
      currentType.value = partnerType;
    };

    onBeforeMount(async () => {
      await store.dispatch('partnerTypes/getAll');
      await store.dispatch('partners/getAll');
      setPartner(partnerTypes.value[0]);
    });

    return {
      partners,
      partnerTypes,
      currentPartners,
      setPartner,
      currentType,
    };
  },
});
</script>

<style lang="scss" scoped>
.partner-page-container {
  display: flex;
}
.el-menu {
  margin-right: 10px;
}
</style>
