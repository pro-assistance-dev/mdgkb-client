<template>
  <component :is="'MainContainer'" header-title="Лицензии и сертификаты">
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
  </component>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import ICertificate from '@/interfaces/ICertificate';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'MainCertificates',
  components: { MainContainer },

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

<style lang="scss" scoped>
img {
  height: 310px;
}

.item {
  margin-bottom: 50px;
}
</style>
