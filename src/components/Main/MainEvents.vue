<template>
  <component
    :is="'MainContainer'"
    header-title="Мероприятия"
    header-button-title="Все мероприятия"
    background-color="white"
    header-button-link="/news"
  >
    <el-carousel
      v-if="mounted"
      ref="carouselRef"
      v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
      :interval="5000"
      indicator-position="outside"
      height="200px"
    >
      <el-carousel-item v-for="(events, i) in carousel" :key="i">
        <MainEventCard v-for="item in events" :key="item.id" :item="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainContainer from '@/components/Main/MainContainer.vue';
import MainEventCard from '@/components/Main/MainEventCard.vue';
import IEventTemplate from '@/interfaces/IEventTemplate';
import IEvent from '@/interfaces/news/IEvent';

export default defineComponent({
  name: 'MainEvents',
  components: { MainEventCard, MainContainer },

  setup() {
    const carousel: Ref<IEventTemplate[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const carouselRef = ref();

    const store = useStore();
    const items: ComputedRef<IEvent[]> = computed<IEvent[]>(() => store.getters['events/items']);

    //
    // const items = [
    //   {
    //     id: '1',
    //     dateStart: '10 августа',
    //     time: '11:00',
    //     content: 'Городской спортивно-зрелищный праздник, посвященный ',
    //     linkText: 'Всероссийскому дню физкультурника и Дню строителя',
    //   },
    //   {
    //     id: '2',
    //     dateStart: '9 августа',
    //     time: '12:00',
    //     content: 'Городской спортивно-зрелищный праздник, посвященный',
    //     linkText: 'Всероссийскому дню физкультурника и Дню строителя',
    //   },
    //   {
    //     id: '3',
    //     dateStart: '1 июня',
    //     dateEnd: '7 августа',
    //     content: 'Морозовская детская больница присоединяется к ',
    //     linkText: 'Всемирной неделе грудного вскармливания',
    //   },
    //   {
    //     id: '4',
    //     dateStart: '6 августа',
    //     time: '12:00',
    //     linkText: '«Школа для мам»',
    //   },
    //   {
    //     id: '5',
    //     dateStart: '1 июня',
    //     dateEnd: '7 августа',
    //     content: 'Морозовская детская больница присоединяется к ',
    //     linkText: 'Всемирной неделе грудного вскармливания',
    //   },
    //   {
    //     id: '6',
    //     dateStart: '10 августа',
    //     time: '11:00',
    //     content: 'Городской спортивно-зрелищный праздник, посвященный ',
    //     linkText: 'Всероссийскому дню физкультурника и Дню строителя',
    //   },
    //   {
    //     id: '7',
    //     dateStart: '9 августа',
    //     time: '12:00',
    //     content: 'Городской спортивно-зрелищный праздник, посвященный',
    //     linkText: 'Всероссийскому дню физкультурника и Дню строителя',
    //   },
    //   {
    //     id: '8',
    //     dateStart: '1 июня',
    //     dateEnd: '7 августа',
    //     content: 'Морозовская детская больница присоединяется к ',
    //     linkText: 'Всемирной неделе грудного вскармливания',
    //   },
    //   {
    //     id: '9',
    //     dateStart: '6 августа',
    //     time: '12:00',
    //     linkText: '«Школа для мам»',
    //   },
    // ];

    const makeCarousel = (array: IEventTemplate[], size: number): IEventTemplate[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    onBeforeMount(async () => {
      await store.dispatch('events/getAllMain');
      mounted.value = true;
      carousel.value = makeCarousel(items.value, 5);
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
