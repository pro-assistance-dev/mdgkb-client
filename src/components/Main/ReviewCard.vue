<template>
  <div class="review-card-container">
    <div class="review-card">
      <div class="review-card-content">{{ item.text }}</div>
      <a @click="$emit('showMore')">Подробнее</a>
    </div>
    <div class="review-card-container-date">
      {{ $dateTimeFormatter.format(item.publishedOn, { month: 'long' }) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Comment from '@/classes/Comment';

export default defineComponent({
  name: 'ReviewCard',
  props: {
    item: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  emits: ['showMore'],
});
</script>

<style lang="scss" scoped>
.review-card-container {
  display: flex;
  flex-direction: column;
  &-date {
    margin-top: 10px;
    color: #a1a7bd;
    letter-spacing: 1px;
    font-size: 13px;
  }
}
.review-card {
  background-color: #c9d4fa;
  max-width: 270px;
  margin-left: 10px;
  padding: 20px;
  border-radius: 25px 25px 0 25px;
  color: black;
  font-size: 14px;
  letter-spacing: 1px;
  &-content {
    max-height: 125px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  a {
    cursor: pointer;
    color: #2754eb;
    text-decoration: unset;
  }
}

@media screen and (max-width: 480px) {
  .review-card {
    margin-left: 0px;
  }
}
</style>
