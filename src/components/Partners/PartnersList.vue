<template>
  <el-card>
    <div v-if="partnerType.showImage" class="partners-images">
      <a v-for="item in partners" :key="item.id" :href="item.link ? item.link : null" target="_blank">
        <img :src="item.image.getImageUrl()" :alt="item.name" />
      </a>
    </div>
    <div v-else class="partners-list">
      <span v-for="item in partners" :key="item.id">{{ item.name }}</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import Partner from '@/classes/Partner';
import PartnerType from '@/classes/PartnerType';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PartnersList',
  setup() {
    const partners: ComputedRef<Partner[]> = computed(() => Provider.store.getters['partners/filteredItems']);
    const partnerType: ComputedRef<PartnerType[]> = computed(() => Provider.store.getters['partnerTypes/item']);

    return {
      partners,
      partnerType,
    };
  },
});
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 0;
  text-align: center;
}
img {
  margin: 10px;
  max-width: 500px;
  max-height: 500px;
}
.partners-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.partners-list {
  display: flex;
  flex-direction: column;
}
.el-card {
  width: 100%;
}
</style>
