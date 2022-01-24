<template>
  <component :is="'MainContainer'" header-title="Мероприятия" header-button-title="Все мероприятия">
    <el-carousel v-if="mounted" :interval="5000" indicator-position="outside" height="200px">
      <el-carousel-item v-for="(events, i) in carousel" :key="i">
        <MainEventCard v-for="item in events" :key="item.id" :item="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import MainEventCard from '@/components/Main/MainEventCard.vue';
import IEventTemplate from '@/interfaces/IEventTemplate';

export default defineComponent({
  name: 'MainEvents',
  components: { MainEventCard, MainContainer },

  setup() {
    const carousel: Ref<IEventTemplate[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const items = [
      {
        id: '1',
        dateStart: '10 августа',
        time: '11:00',
        content: 'Городской спортивно-зрелищный праздник, посвященный ',
        linkText: 'Всероссийскому дню физкультурника и Дню строителя',
      },
      {
        id: '2',
        dateStart: '9 августа',
        time: '12:00',
        content: 'Городской спортивно-зрелищный праздник, посвященный',
        linkText: 'Всероссийскому дню физкультурника и Дню строителя',
      },
      {
        id: '3',
        dateStart: '1 июня',
        dateEnd: '7 августа',
        content: 'Морозовская детская больница присоединяется к ',
        linkText: 'Всемирной неделе грудного вскармливания',
      },
      {
        id: '4',
        dateStart: '6 августа',
        time: '12:00',
        linkText: '«Школа для мам»',
      },
      {
        id: '5',
        dateStart: '1 июня',
        dateEnd: '7 августа',
        content: 'Морозовская детская больница присоединяется к ',
        linkText: 'Всемирной неделе грудного вскармливания',
      },
      {
        id: '6',
        dateStart: '10 августа',
        time: '11:00',
        content: 'Городской спортивно-зрелищный праздник, посвященный ',
        linkText: 'Всероссийскому дню физкультурника и Дню строителя',
      },
      {
        id: '7',
        dateStart: '9 августа',
        time: '12:00',
        content: 'Городской спортивно-зрелищный праздник, посвященный',
        linkText: 'Всероссийскому дню физкультурника и Дню строителя',
      },
      {
        id: '8',
        dateStart: '1 июня',
        dateEnd: '7 августа',
        content: 'Морозовская детская больница присоединяется к ',
        linkText: 'Всемирной неделе грудного вскармливания',
      },
      {
        id: '9',
        dateStart: '6 августа',
        time: '12:00',
        linkText: '«Школа для мам»',
      },
    ];

    const makeCarousel = (array: IEventTemplate[], size: number): IEventTemplate[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

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
