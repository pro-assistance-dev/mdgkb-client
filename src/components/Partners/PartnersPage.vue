<template>
  <div class="partner-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <el-menu default-active="0">
            <el-menu-item v-for="(item, index) in partnerTypes" :key="item.id" :index="String(index)" @click="setPartner(item)">
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="content-container">
      <PartnersList :partners="currentPartners" :partner-type="currentType" />
    </div>
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
