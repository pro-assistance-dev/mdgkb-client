<template>
  <div v-if="carousel.length" class="education">
    <div class="title-in">Сертификаты</div>
    <div v-if="carousel.length > 0" class="gallery-container">
      <el-carousel ref="carouselRef" v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)" arrow="always" :interval="4000">
        <el-carousel-item v-for="certificatesGroups in carousel" :key="certificatesGroups">
          <div v-for="certificate in certificatesGroups" :key="certificate.id" class="image-container">
            <img
              :src="certificate.scan.getImageUrl()"
              :alt="certificate.scan.originalName"
              :style="{ height: '80%', width: '80%' }"
              @click="imgClickHandler(certificate)"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-dialog v-model="dialogVisible" center :show-close="false" top="25vh">
      <div>
        <img
          :style="{ height: '50vh', width: '50vh', 'justify-content': 'center', padding: '5%' }"
          :src="dialogScan.scan.getImageUrl()"
          :alt="dialogScan.scan.originalName"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import IScanWithDescription from '@/interfaces/IScanWithDescription';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'ScansSlider',
  components: {},
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
.image-container {
  width: 220px;
  height: 320px;
}

:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
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

.education {
  display: block;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
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

.point {
  display: flex;
  margin: 0px 0px 20px 20px;
}

.point-info {
  display: block;
  height: auto;
  margin: 10px 0px 0px 5px;
}

.point-year {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 14px;
  color: #a1a7bd;
  font-weight: bold;
}

.point-text {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 11px;
  color: #5d6477;
  font-weight: lighter;
  line-height: 110%;
}

/* Decoration of lists */

.point-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.point-list-item {
  margin-bottom: 1rem;
  padding-left: 25px;
  position: relative;
}

.point-list-item:before {
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  width: 10px;
  height: 10px;
  border: 2px solid #a1a7bd;
  background-color: #ffffff;
  border-radius: 50%;
  z-index: 2;
}

.point-list-item:after {
  content: '';
  position: absolute;
  top: -8px;
  left: 6px;
  width: 2px;
  height: calc(100% + 3rem);
  background-color: #a1a7bd;
}

.point-list-item:last-of-type:after {
  height: calc(100% + 1.3rem);
}
</style>
