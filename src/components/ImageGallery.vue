<template>
  <div v-if="images.length > 0" class="gallery-container">
    <el-carousel arrow="always" :interval="4000" indicator-position="outside">
      <el-carousel-item v-for="image in images" :key="image.id">
        <img :src="image.fileInfo.getImageUrl()" alt="alt" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import INewsImage from '@/interfaces/news/INewsImage';

export default defineComponent({
  name: 'ImageGallery',
  props: {
    images: {
      type: Array as PropType<Array<INewsImage | IDivisionImage>>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.gallery-container {
  margin-top: 30px;
  max-width: 800px;
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
