<template>
  <component :is="'MainContainer'" header-title="Лицензии и сертификаты">
    <el-carousel v-if="mounted" :interval="5000" indicator-position="outside" height="350px">
      <el-carousel-item v-for="(certificates, i) in carousel" :key="i">
        <img v-for="item in certificates" :key="item" :src="require(`@/assets/img/main-page/templates/${item.description}`)" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import ICertificate from '@/interfaces/ICertificate';

export default defineComponent({
  name: 'MainCertificates',
  components: { MainContainer },

  setup() {
    const carousel: Ref<ICertificate[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);

    const makeCarousel = (array: ICertificate[], size: number): ICertificate[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    const items = [
      {
        description: 'certificate.png',
      },
      {
        description: 'certificate.png',
      },
      {
        description: 'certificate.png',
      },
      {
        description: 'certificate.png',
      },
      {
        description: 'certificate.png',
      },
      {
        description: 'certificate.png',
      },
      {
        description: 'certificate.png',
      },
    ];

    onBeforeMount(async () => {
      carousel.value = makeCarousel(items, 4);
      mounted.value = true;
    });

    return {
      carousel,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
img {
  height: 310px;
}
</style>
