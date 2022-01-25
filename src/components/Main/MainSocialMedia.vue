<template>
  <component :is="'MainContainer'" header-title="Соцсети" background-color="white">
    <el-carousel v-if="mounted" :interval="5000" indicator-position="outside" height="350px">
      <el-carousel-item v-for="(socialMedias, i) in carousel" :key="i">
        <SocialMediaCard v-for="item in socialMedias" :key="item.id" :item="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import SocialMediaCard from '@/components/SocialMediaCard.vue';
import ISocialMedia from '@/interfaces/ISocialMedia';

export default defineComponent({
  name: 'MainSocialMedia',
  components: { MainContainer, SocialMediaCard },

  setup() {
    const carousel: Ref<ISocialMedia[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);

    const makeCarousel = (array: ISocialMedia[], size: number): ISocialMedia[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    const items = [
      {
        icon: 'ig',
        title: '@morozdgkbdzm',
        content:
          'Веселое настроение пациентам отделений ревматологии, гинекологии и кардиологии Морозовской детской больницы подарили представители благотворительного фонда «Подари солнечный свет» и компании «TOY.ru»',
      },
      {
        icon: 'fb',
        title: '@morozov2.0',
        content: 'В Морозовской больнице спасли ребенка с огромной опухолью, которая была неоперабельна.',
      },
      {
        icon: 'yt',
        title: 'Морозовская детская больница',
        content: 'У Детей тоже может быть Диабет',
      },
      {
        icon: 'ig',
        title: '@morozdgkbdzm',
        content: 'Совместно с благотворительным фондом "Подари солнечный свет" @podari_svet провели "Школу для мам".',
      },
      {
        icon: 'ig',
        title: '@morozdgkbdzm',
        content:
          'Веселое настроение пациентам отделений ревматологии, гинекологии и кардиологии Морозовской детской больницы подарили представители благотворительного фонда «Подари солнечный свет» и компании «TOY.ru»',
      },
      {
        icon: 'fb',
        title: '@morozov2.0',
        content: 'В Морозовской больнице спасли ребенка с огромной опухолью, которая была неоперабельна.',
      },
      {
        icon: 'yt',
        title: 'Морозовская детская больница',
        content: 'У Детей тоже может быть Диабет',
      },
    ];

    onBeforeMount(async () => {
      carousel.value = makeCarousel(items, 5);
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
:deep(.el-carousel__item) {
  align-items: flex-start;
}
</style>
