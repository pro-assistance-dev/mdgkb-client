<template>
  <component :is="'MainContainer'" header-title="Отзывы" footer-button-title="Все отзывы" background-color="white">
    <div class="main-page-reviews">
      <ReviewCard v-for="item in reviews" :key="item.id" :item="item" />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import ReviewCard from '@/components/Main/ReviewCard.vue';

export default defineComponent({
  name: 'MainReviews',
  components: { MainContainer, ReviewCard },

  setup() {
    const reviews = [
      {
        id: '1',
        text: 'Александр Геннадьевич очень внимательный и грамотный доктор. По имеющимся у вас вопросам проконсультирует, выслушает и подскажет, что и как лучше сделать.',
        publishedOn: new Date('2022-01-19T17:39:17Z'),
      },
      {
        id: '2',
        text: 'Александр Геннадьевич очень внимательный и грамотный доктор. По имеющимся у вас вопросам проконсультирует, выслушает и подскажет, что и как лучше сделать.',
        publishedOn: new Date('2022-01-19T17:39:17Z'),
      },
      {
        id: '3',
        text: 'Александр Геннадьевич очень внимательный и грамотный доктор. По имеющимся у вас вопросам проконсультирует, выслушает и подскажет, что и как лучше сделать.',
        publishedOn: new Date('2022-01-19T17:39:17Z'),
      },
      {
        id: '4',
        text: 'Александр Геннадьевич очень внимательный и грамотный доктор. По имеющимся у вас вопросам проконсультирует, выслушает и подскажет, что и как лучше сделать. Александр Геннадьевич очень внимательный и грамотный доктор. По имеющимся у вас вопросам проконсультирует, выслушает и подскажет, что и как лучше сделать. Александр Геннадьевич очень внимательный и грамотный доктор. По имеющимся у вас вопросам проконсультирует, выслушает и подскажет, что и как лучше сделать.',
        publishedOn: new Date('2022-01-19T17:39:17Z'),
      },
    ];

    return {
      reviews,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-page-reviews {
  display: flex;
  justify-content: space-between;
}
</style>
