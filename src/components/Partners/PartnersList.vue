<template>
  <el-card>
    <h3>{{ partnerType.name }}</h3>
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
import { defineComponent, PropType } from 'vue';

import IPartner from '@/interfaces/partners/IPartner';
import IPartnerType from '@/interfaces/partners/IPartnerType';

export default defineComponent({
  name: 'PartnersList',
  props: {
    partners: {
      type: Array as PropType<IPartner[]>,
      required: true,
    },
    partnerType: {
      type: Object as PropType<IPartnerType>,
      required: true,
    },
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
