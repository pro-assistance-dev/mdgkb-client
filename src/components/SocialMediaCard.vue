<template>
  <div class="social-media-card">
    <a :href="item.link" class="social-media-card-link" target="_blank">
      <img class="social-media-card-img" :src="item.image" />
    </a>
    <div class="social-media-card-header">
      <a :href="item.link" class="social-media-card-link" target="_blank">
        <component :is="require(`@/assets/img/main-page/icons/social/${item.icon}.svg`).default" class="social-media-card-header-icon" />
      </a>
      <a :href="item.link" class="social-media-card-link" target="_blank">
        <div class="social-media-card-header-title">{{ item.title }}</div>
      </a>
    </div>

    <div class="social-media-card-content">{{ item.description }}</div>
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

  &-link {
    color: inherit;
    text-decoration: unset;

    &:hover {
      cursor: pointer;
    }
  }
  &-img {
    width: 170px;
    border-radius: 10px;
    object-fit: none;
    height: 170px;
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
