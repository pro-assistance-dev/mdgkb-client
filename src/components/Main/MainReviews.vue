<template>
  <component
    :is="'MainContainer'"
    header-title="Отзывы"
    footer-button-title="Все отзывы"
    footer-button-link="/comments"
    background-color="white"
  >
    <div class="main-page-reviews">
      <ReviewCard v-for="item in reviews" :key="item.id" :item="item" />
    </div>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import MainContainer from '@/components/Main/MainContainer.vue';
import ReviewCard from '@/components/Main/ReviewCard.vue';
import IComment from '@/interfaces/comments/IComment';

export default defineComponent({
  name: 'MainReviews',
  components: { MainContainer, ReviewCard },

  setup() {
    const store = useStore();

    const reviews: ComputedRef<IComment[]> = computed(() => store.getters['comments/comments']);

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('comments/getAllMain');
    });

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
