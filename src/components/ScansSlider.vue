<template>
  <CollapseItem v-if="carousel.length" tab-id="8" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Сертификаты</div>
    </template>
    <template #inside-content>
      <div v-if="carousel.length" class="certificate">
        <div v-if="carousel.length > 0" class="gallery-container">
          <el-carousel
            ref="carouselRef"
            v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
            arrow="always"
            :interval="4000"
          >
            <el-carousel-item v-for="certificatesGroups in carousel" :key="certificatesGroups">
              <div v-for="certificate in certificatesGroups" :key="certificate.id" class="image-container">
                <img
                  class="image-card"
                  :src="certificate.scan.getImageUrl()"
                  :alt="certificate.scan.originalName"
                  :style="{ height: '100%', width: '100%' }"
                  @click="imgClickHandler(certificate)"
                />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-dialog v-model="dialogVisible" center :show-close="false" top="15vh">
          <div class="img-description">{{ dialogScan.description }}</div>
          <div class="img-block">
            <img
              :style="{ height: '50vh', width: '50vh', 'justify-content': 'center', padding: '5%' }"
              :src="dialogScan.scan.getImageUrl()"
              :alt="dialogScan.scan.originalName"
            />
          </div>
        </el-dialog>
      </div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import IScanWithDescription from '@/interfaces/IScanWithDescription';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'ScansSlider',
  components: { CollapseItem },
  props: {
    galleryElements: {
      type: Object as PropType<IScanWithDescription[]>,
      required: true,
    },
  },
  setup(props) {
    const carousel: Ref<IScanWithDescription[][]> = ref([]);

    const dialogVisible: Ref<boolean> = ref(false);
    const dialogScan: Ref<IScanWithDescription | undefined> = ref(undefined);
    const carouselRef = ref();

    const imgClickHandler = (scan: IScanWithDescription) => {
      dialogScan.value = scan;
      dialogVisible.value = true;
    };

    onBeforeMount(async () => {
      carousel.value = makeCarousel<IScanWithDescription>(props.galleryElements, 3);
    });

    return {
      dialogVisible,
      dialogScan,
      imgClickHandler,
      carouselRef,
      carousel,
    };
  },
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.certificate {
  display: block;
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.img-block {
  display: flex;
  justify-content: center;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 10px;
}

.img-description {
  display: block;
  text-align: center;
  font-size: 18px;
  color: $site_dark_gray;
  padding: 0 0 10px 0;
  font-family: $base-font;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: #343e5c;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.image-card {
  transition: all 0.3s;
}

.image-card:hover {
  box-shadow: $normal-shadow;
  cursor: pointer;
}

.image-container {
  width: 220px;
  height: 320px;
  padding-bottom: 10px;
}

:deep(.el-carousel__container) {
  height: 380px;
}

:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

:deep(.el-carousel__button) {
  background-color: $site_gray;
}

:deep(.el-dialog__header) {
  display: none;
}
</style>
