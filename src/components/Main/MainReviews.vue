<template>
  <component
    :is="'MainContainer'"
    v-if="mounted"
    header-title="Отзывы"
    footer-button-title="Все отзывы"
    footer-button-link="/comments"
    background-color="white"
  >
    <div class="main-page-reviews">
      <!-- <div class="mobile1"><ReviewCard  v-for="item in reviews" :key="item.id" :item="item" @showMore="showMore(item)" /></div> -->
      <ReviewCard v-for="item in reviews" :key="item.id" :item="item" @showMore="showMore(item)" />
      <!-- <div class="mobile3"><ReviewCard  v-for="item in reviews.splice(0, 2)" :key="item.id" :item="item" @showMore="showMore(item)" /></div> -->
    </div>

    <el-dialog v-model="showDialog">
      <CommentCard v-if="dialogComment" :comment="dialogComment" />
    </el-dialog>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Comment from '@/classes/Comment';
import CommentCard from '@/components/Comments/CommentCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import ReviewCard from '@/components/Main/ReviewCard.vue';

export default defineComponent({
  name: 'MainReviews',
  components: { MainContainer, ReviewCard, CommentCard },

  setup() {
    const store = useStore();
    const showDialog: Ref<boolean> = ref(false);
    const mounted = ref(false);
    const reviews: ComputedRef<Comment[]> = computed(() => store.getters['comments/comments']);
    const dialogComment: Ref<Comment | undefined> = ref();

    const showMore = (item: Comment) => {
      dialogComment.value = item;
      showDialog.value = true;
    };

    onBeforeMount(async (): Promise<void> => {
      console.log('1');
      await store.dispatch('comments/getAllMain');
      console.log('2');
      mounted.value = true;
    });

    return {
      mounted,
      reviews,
      showDialog,
      showMore,
      dialogComment,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-page-reviews {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 650px) {
  .main-page-reviews {
    flex-direction: column;
    align-items: center;
  }
}
</style>
