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
import Partner from '@/classes/Partner';
import PartnerType from '@/classes/PartnerType';

const partners: Partner[] = PartnersStore.Items();
const partnerType: PartnerType[] = ParnersTypesStore.Items();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
