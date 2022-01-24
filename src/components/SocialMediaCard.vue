<template>
  <div class="social-media-card">
    <img class="social-media-card-img" src="@/assets/img/310x310.png" />
    <div class="social-media-card-header">
      <component :is="require(`@/assets/img/main-page/icons/social/${item.icon}.svg`).default" class="social-media-card-header-icon" />
      <div class="social-media-card-header-title">{{ item.title }}</div>
    </div>
    <div class="social-media-card-content">{{ item.content }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ISocialMedia from '@/interfaces/ISocialMedia';
export default defineComponent({
  name: 'SocialMediaCard',
  props: {
    item: {
      type: Object as PropType<ISocialMedia>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.social-media-card {
  display: flex;
  flex-direction: column;
  width: 170px;
  &-img {
    height: 170px;
    border-radius: 10px;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    color: #2754eb;
    letter-spacing: 1px;
    &-icon {
      height: 20px;
      fill: #2754eb;
    }
    &-title {
      text-align: end;
      width: 80%;
      font-size: 14px;
      line-height: 1;
    }
  }
  &-content {
    font-size: 11px;
  }
}
</style>
