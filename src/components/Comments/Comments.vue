<template>
  <CollapseItem tab-id="100" :is-collaps="false">
    <template #inside-title>
      <div class="title-in">{{ !isReviews ? 'Комментарии' : 'Отзывы' }} ({{ comments.length }}):</div>
    </template>
    <template #inside-content>
      <div id="reviews" :class="{ reviews: isReviews }">
        <div id="leave-a-review" class="leave-a-review">
          <h4>Оставить {{ !isReviews ? 'комментарий' : 'отзыв' }}:</h4>
          <CommentForm :store-module="storeModule" :parent-id="parentId" :is-reviews="isReviews" @scroll="scroll('#comments-block')" />
        </div>
        <div v-if="comments.length" id="comments-block">
          <div v-for="item in comments" :key="item.comment.id" class="reviews-point">
            <CommentCard :comment="item.comment" :is-review="isReviews" />
          </div>
        </div>
      </div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import CommentCard from '@/components/Comments/CommentCard.vue';
import CommentForm from '@/components/Comments/CommentForm.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import IWithComment from '@/interfaces/IWithComment';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'Comments',
  components: { CommentCard, CommentForm, CollapseItem },
  props: {
    storeModule: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
    isReviews: {
      type: Boolean,
      default: true,
    },
  },
  setup(prop) {
    const store = useStore();
    const comments: ComputedRef<IWithComment[]> = computed(() => store.getters[`${prop.storeModule}/comments`]);

    return {
      comments,
      scroll,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

/* .hidden {
  display: none;
} */

.reviews {
  display: block;
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.reviews-point {
  display: block;
  background-clip: padding-box;
}

.leave-a-review {
  display: block;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 20px;
  letter-spacing: 0.1em;
  color: #343e5c;
  align-items: center;
  font-weight: bold;
  align-items: right;
  padding-bottom: 20px;
}
</style>
