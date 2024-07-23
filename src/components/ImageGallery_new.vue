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
            v-touch:swipe="(direction: string) => $carouselSwipe(direction, carouselRef)"
            indicator-position="outside"
            :interval="5000"
            height="300px"
            arrow="always"
          >
            <el-carousel-item v-for="(imagesGroup, i) in carousel" :key="i">
              <div v-for="item in imagesGroup" :key="item.id" class="foto-field">
                <div class="division-img">
                  <img :src="item.fileInfo.getImageUrl()" :alt="item.fileInfo.originalName" @click="imgClickHandler(item.fileInfo)" />
                </div>
                <div data-test="chief-name" class="image-description-title">
                  {{ item.description }}
                </div>
              </div>
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
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import DivisionImage from '@/classes/DivisionImage';
import FileInfo from '@/services/classes/FileInfo';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'ImageGalleryNew',
  components: { CollapseItem },
  props: {
    images: {
      type: Array as PropType<DivisionImage[]>,
      default: () => [],
      required: true,
    },
    quantity: {
      type: Number,
      default: 3,
      required: false,
    },
  },
  setup(props) {
    const dialogVisible: Ref<boolean> = ref(false);
    const dialogFileInfo: Ref<FileInfo> = ref(new FileInfo());
    const carouselRef = ref();
    const carousel: Ref<DivisionImage[][]> = ref([]);

    const imgClickHandler = (fileInfo: FileInfo) => {
      dialogFileInfo.value = fileInfo;
      dialogVisible.value = true;
    };

    onBeforeMount(() => {
      if (props.quantity) {
        carousel.value = makeCarousel<DivisionImage>(props.images, props.quantity);
        console.log('Значение карусели: ' + carousel.value);
      }
    });

    return {
      dialogVisible,
      dialogFileInfo,
      imgClickHandler,
      carouselRef,
      carousel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.gallery-container {
  margin-top: 30px;
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

:deep(.el-dialog) {
  padding: 0px;
  width: 0px;
}

:deep(.el-dialog--center) {
  padding: 0px;
}

:deep(.el-dialog__header) {
  padding: 0px;
}

:deep(.el-dialog__body) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  height: 500px;
  width: auto;
  img {
    height: 100%;
    width: auto;
    box-shadow: $normal-shadow;
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

.image-description-title {
  display: flex;
  justify-content: center;
  font-size: 14px;
  width: 300px;
}

.foto-field {
  border-radius: $border-radius;
  border: $normal-darker-border;
  max-height: 200px;
  // max-width: 360px;
  background-color: white;
  background-clip: padding-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .division-img {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    img {
      border-radius: 5px;
      height: 200px;
      width: auto;
    }
    .favor {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      border-radius: 50%;
      border: 1px solid rgb(black, 0.1);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
      width: 30px;
      height: 30px;
      &:hover {
        transform: scale(1.1);
      }
      .anticon {
        font-size: 20px;
        color: #bdc2d1;
      }
    }
  }
  .doctor-name {
    font-size: 15px;
    font-weight: bold;
    margin: 2px 0 5px 0;
    line-height: 1.15;
  }

  .status {
    color: #a1a7bd;
    margin-bottom: 5px;
    font-size: 12px;
  }
}

@media screen and (max-width: 1024px) {
  :deep(.el-dialog__body) {
    height: 400px;
  }
}

@media screen and (max-width: 768px) {
  :deep(.el-dialog__body) {
    height: 300px;
  }
}

@media screen and (max-width: 580px) {
  :deep(.el-dialog__body) {
    height: 260px;
  }
}

@media screen and (max-width: 500px) {
  :deep(.el-dialog__body) {
    height: 220px;
  }
}

@media screen and (max-width: 440px) {
  :deep(.el-dialog__body) {
    height: 180px;
  }
}

@media screen and (max-width: 350px) {
  :deep(.el-dialog__body) {
    height: 160px;
  }
}
</style>
