<template>
  <CollapseItem :tab-id="100" :is-collaps="false">
    <template #inside-title>
      <div class="title-in">{{ !isReviews ? 'Комментарии' : 'Отзывы' }} ({{ comments?.length }}):</div>
    </template>
    <template #inside-content>
      <div id="reviews" :class="{ reviews: isReviews }">
        <div id="leave-a-review" class="leave-a-review">
          <h4>Оставить {{ !isReviews ? 'комментарий' : 'отзыв' }}:</h4>
          <CommentForm :store-module="storeModule" :parent-id="parentId" :is-reviews="isReviews" @scroll="scroll('#comments-block')" />
        </div>
        <div v-if="comments?.length" id="comments-block">
          <div v-for="comment in comments" :key="comment.id" class="reviews-point">
            <CommentCard :comment="comment" :is-review="isReviews" />
          </div>
        </div>
      </div>
    </template>
  </CollapseItem>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';
import scroll from '@/services/Scroll';

defineProps({
  comments: {
    type: Array<Comment>,
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
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

@media screen and (max-width: 400px) {
  .reviews {
    padding: 0px 20px;
  }
}
</style>
