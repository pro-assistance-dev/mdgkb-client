<template>
  <div v-if="newsImages.length > 0" class="gallery-container">
    <el-carousel arrow="always" :interval="4000" indicator-position="outside">
      <el-carousel-item v-for="newsImage in newsImages" :key="newsImage.id">
        <img :src="newsImage.fileInfo.getImageUrl()" alt="alt" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import INewsImage from '@/interfaces/news/INewsImage';

export default defineComponent({
  name: 'NewsGallery',
  props: {
    newsImages: {
      type: Array as PropType<Array<INewsImage>>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.gallery-container {
  margin-top: 30px;
  img {
    width: 100%;
    max-width: 100%;
  }
}
:deep(.el-carousel__arrow) {
  background-color: white;
  color: black;

  &:hover {
    background-color: #9c9c9c;
  }
}
</style>
