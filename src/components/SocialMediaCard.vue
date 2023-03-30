<template>
  <div class="social-media-card">
    <a :href="item.link" class="social-media-card-link" target="_blank">
      <img class="social-media-card-img" :src="item.image" />
    </a>
    <div class="social-media-card-header">
      <a :href="item.link" class="social-media-card-link icon" target="_blank">
        <svg class="icon">
          <use v-if="item.isVK()" xlink:href="#icon-VK"></use>
          <use v-if="item.isYouTube()" xlink:href="#icon-YT"></use>
        </svg>
      </a>
      <a :href="item.link" class="social-media-card-link" target="_blank">
        <div class="social-media-card-header-title">{{ item.title }}</div>
      </a>
    </div>

    <div class="social-media-card-content">{{ item.description }}</div>
  </div>
  <SocialIcons />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import SocialIcons from '@/assets/svg/Main/SocialIcons.svg';
import SocialMedia from '@/classes/SocialMedia';
export default defineComponent({
  name: 'SocialMediaCard',
  components: {
    SocialIcons,
  },
  props: {
    item: {
      type: Object as PropType<SocialMedia>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.icon {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  &:hover {
    fill: #133dcc;
  }
}
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
    justify-content: left;
    align-items: center;
    margin: 5px 0;
    color: #2754eb;
    letter-spacing: 1px;
    &-icon {
      height: 20px;
      fill: #2754eb;
    }
    &-title {
      text-align: start;
      width: 100%;
      font-size: 14px;
      line-height: 1;
      margin-left: 10px;
    }
  }
  &-content {
    font-size: 13px;
    text-overflow: ellipsis;
    max-height: 70px;
    text-align: justify;
  }
}
</style>
