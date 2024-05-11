<template>
  <CollapseItem v-if="images.length > 0" tab-id="4">
    <template #inside-title>
      <div class="title-in">Фотографии</div>
    </template>
    <template #inside-content>
      <div class="image-gallery-container">
        <div v-if="images.length > 0" class="gallery-container">
          <el-carousel
            ref="carouselRef"
            v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
            arrow="always"
            :interval="4000"
          >
            <el-carousel-item v-for="image in images" :key="image.id">
              <img :src="image.fileInfo.getImageUrl()" :alt="image.fileInfo.originalName" @click="imgClickHandler(image.fileInfo)" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-dialog v-model="dialogVisible" center :show-close="false" top="25vh">
          <img :src="dialogFileInfo.getImageUrl()" :alt="dialogFileInfo.originalName" />
        </el-dialog>
      </div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import DivisionImage from '@/classes/DivisionImage';
import FileInfo from '@/services/classes/FileInfo.ts';
import NewsImage from '@/classes/NewsImage';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';

export default defineComponent({
  name: 'ImageGallery',
  components: { CollapseItem },
  props: {
    images: {
      type: Array as PropType<Array<NewsImage | DivisionImage>>,
      required: true,
    },
  },
  setup() {
    const dialogVisible: Ref<boolean> = ref(false);
    const dialogFileInfo: Ref<FileInfo> = ref(new FileInfo());
    const carouselRef = ref();

    const imgClickHandler = (fileInfo: FileInfo) => {
      dialogFileInfo.value = fileInfo;
      dialogVisible.value = true;
    };

    return {
      dialogVisible,
      dialogFileInfo,
      imgClickHandler,
      carouselRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.gallery-container {
  margin-top: 30px;
  max-width: 1000px;
  img {
    width: 100%;
    max-width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
}
:deep(.el-carousel__arrow) {
  background-color: white;
  color: black;

  &:hover {
    background-color: #9c9c9c;
  }
}
:deep(.el-dialog__body),
:deep(.el-dialog__header) {
  padding: 0 !important;
  height: auto !important;
  img {
    width: 100%;
    max-width: 100%;
  }
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}
</style>
