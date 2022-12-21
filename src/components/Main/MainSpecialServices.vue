<template>
  <component :is="'MainContainer'" header-title="Особые сервисы" header-button-title="Все сервисы">
    <div class="special-services-cards">
      <SpecialServiceCard v-for="item in items" :key="item.title" :item="item" />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import SpecialServiceCard from '@/components/SpecialServiceCard.vue';

export default defineComponent({
  name: 'MainSpecialServices',
  components: { SpecialServiceCard, MainContainer },
  setup() {
    const items = [
      // {
      //   imgName: 'spec-serv1.webp',
      //   title: 'Тест на COVID-19',
      //   content:
      //     'ПЦР-тест позволяет определить наличие/отсутствие генетического материала (РНК) вируса в мазке со слизистой носо- и/или ротоглотки и является основным рекомендованным методом лабораторной диагностики COVID-19.',
      // },
      // {
      //   imgName: 'spec-serv2.webp',
      //   title: 'Выезд на дом',
      //   content:
      //     'ПЦР-тест позволяет определить наличие/отсутствие генетического материала (РНК) вируса в мазке со слизистой носо- и/или ротоглотки и является основным рекомендованным методом лабораторной диагностики COVID-19.',
      // },
      {
        imgName: 'spec-serv1.webp',
        title: 'Амбулаторно-поликлиническая помощь',
        content: 'Больница оказывает полный спектр услуг по амбулаторно-поликлинической помощи',
        link: '/divisions',
      },
      {
        imgName: 'spec-serv2.webp',
        title: 'Диагностика',
        content:
          '24/7. Обследование могут пройти как дети, так и взрослые. Лабораторные и рентген-исследования (без контраста) проводятся без предварительной записи',
        link: '/divisions',
      },
      {
        imgName: 'spec-serv3.webp',
        title: 'Стоматология',
        content:
          'ПЦР-тест позволяет определить наличие/отсутствие генетического материала (РНК) вируса в мазке со слизистой носо- и/или ротоглотки и является основным рекомендованным методом лабораторной диагностики COVID-19.',
      },
      {
        imgName: 'spec-serv4.webp',
        title: 'Чек-ап',
        content:
          'ПЦР-тест позволяет определить наличие/отсутствие генетического материала (РНК) вируса в мазке со слизистой носо- и/или ротоглотки и является основным рекомендованным методом лабораторной диагностики COVID-19.',
      },
    ];

    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.special-services-container {
  display: flex;
  flex-direction: column;
}
.special-services-cards {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
}
</style>
