<template>
  <div v-if="true" class="certificates">
    <div class="title-in">Сертификаты</div>
    <el-carousel
      v-if="mounted"
      ref="carouselRef"
      v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
      :interval="5000"
      indicator-position="outside"
      height="350px"
    >
    <el-carousel-item v-for="(certificates, i) in carousel" :key="i">
      <img v-for="item in certificates" :key="item" class="item" :src="require(`@/assets/img/main-page/templates/${item.description}`)" />
    </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import ICertificate from '@/interfaces/ICertificate';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'DoctorCertificates',

  setup() {
    const carousel: Ref<ICertificate[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const carouselRef = ref();

    const items = [
      {
        description: 'certificate.webp',
      },
      {
        description: 'certificate.webp',
      },
      {
        description: 'certificate.webp',
      },
      {
        description: 'certificate.webp',
      },
      {
        description: 'certificate.webp',
      },
      {
        description: 'certificate.webp',
      },
      {
        description: 'certificate.webp',
      },
    ];

    onBeforeMount(async () => {
      carousel.value = makeCarousel<ICertificate>(items, 4);
      mounted.value = true;
    });

    return {
      carousel,
      carouselRef,
      mounted,
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

.certificates {
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
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

img {
  height: 310px;
}

.item {
  margin-bottom: 50px;
}

:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
:deep(.el-carousel__container) {
  max-height: auto;
  // height: unset;
}

</style>
