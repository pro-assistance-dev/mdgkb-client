<template>
  <component
    :is="'MainContainer'"
    header-title="Отзывы"
    footer-button-title="Все отзывы"
    footer-button-link="/comments"
    background-color="white"
  >
    <div class="main-page-reviews">
      <!-- <div class="mobile1"><ReviewCard  v-for="item in reviews" :key="item.id" :item="item" @showMore="showMore(item)" /></div> -->
      <ReviewCard v-for="item in reviews.splice(0, 3)" :key="item.id" :item="item" @showMore="showMore(item)" />
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

import CommentCard from '@/components/Comments/CommentCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import ReviewCard from '@/components/Main/ReviewCard.vue';
import IComment from '@/interfaces/comments/IComment';

export default defineComponent({
  name: 'MainReviews',
  components: { MainContainer, ReviewCard, CommentCard },

  setup() {
    const store = useStore();
    const showDialog: Ref<boolean> = ref(false);

    const reviews: ComputedRef<IComment[]> = computed(() => store.getters['comments/comments']);
    const dialogComment: Ref<IComment | undefined> = ref();

    const showMore = (item: IComment) => {
      dialogComment.value = item;
      showDialog.value = true;
    };

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('comments/getAllMain');
    });

    return {
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

// .mobile2 {
//   display: none;
// }

// .mobile3 {
//   display: none;
// }

// @media screen and (max-width: 1300px) {
//   .mobile1 {
//     display: none;
//   }

//   .mobile2 {
//     display: block;
//   }

//   .mobile3 {
//     display: none;
//   }
// }

// @media screen and (max-width: 980px) {
//   .mobile1 {
//     display: none;
//   }

//   .mobile2 {
//     display: none;
//   }

//   .mobile3 {
//     display: block;
//   }
// }

@media screen and (max-width: 650px) {
  .main-page-reviews {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  // .mobile1 {
  //   display: none;
  // }

  // .mobile2 {
  //   display: none;
  // }

  // .mobile3 {
  //   display: block;
  // }
}
</style>
