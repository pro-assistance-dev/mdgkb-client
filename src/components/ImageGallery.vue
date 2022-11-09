<template>
  <CollapsContainer v-if="images.length > 0" tab-id="4">
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
  </CollapsContainer>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import FileInfo from '@/classes/File/FileInfo';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivisionImage from '@/interfaces/IDivisionImage';
import IDocumentTypeImage from '@/interfaces/IDocumentTypeImage';
import INewsImage from '@/interfaces/news/INewsImage';

export default defineComponent({
  name: 'ImageGallery',
  components: { CollapsContainer },
  props: {
    images: {
      type: Array as PropType<Array<INewsImage | IDivisionImage | IDocumentTypeImage>>,
      required: true,
    },
  },
  setup() {
    const dialogVisible: Ref<boolean> = ref(false);
    const dialogFileInfo: Ref<IFileInfo> = ref(new FileInfo());
    const carouselRef = ref();

    const imgClickHandler = (fileInfo: IFileInfo) => {
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
</style>
