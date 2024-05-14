<template>
  <div v-if="news.id" class="main-card card-hover" @click="$router.push(`/news/${news.id}`)">
    <div class="main-image">
      <img :src="news.getImageUrl()" alt="news-image" />
      <div class="tags">
        <el-tag v-for="newsToTag in news.newsToTags.slice(0)" :key="newsToTag.id" effect="plain" class="news-tag-link" size="small">
          <span>{{ newsToTag.tag.label }}</span>
        </el-tag>
      </div>
    </div>
    <Close v-if="showClose" class="close-icon" @click.stop="$emit('close')" />

    <div class="main-card-container">
      <div class="title">{{ news.title }}</div>
      <div class="meta">
        <NewsMeta :news="news" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Close from '@/assets/svg/Icons/Close.svg';
import News from '@/classes/News';
import NewsMeta from '@/components/News/NewsMeta.vue';

export default defineComponent({
  name: 'MainBigNewsCard',
  components: { NewsMeta, Close },
  props: {
    news: {
      type: Object as PropType<News>,
      required: true,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.main-card {
  width: 100%;
  position: relative;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

.main-image {
  height: auto;
  width: 100%;
  img {
    width: 100%;
    object-fit: cover;
  }
}

.main-card-container {
  width: calc(100% - 30px);
  padding: 0px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tags {
  width: calc(100% - 30px);
  padding: 0 15px;
  .news-tag-link {
    font-size: 12px;
  }
}
.title {
  display: flex;
  align-items: start;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 1px;
  margin: auto 0;
  height: 80px;
  overflow: hidden;
}
.meta {
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
  color: #a1a7bd;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  padding-bottom: 5px;
  :deep(.anticon) {
    font-size: 20px;
    height: 20px;
  }
}

.close-icon {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  backdrop-filter: blur(5px);
  border-radius: 20%;
  padding: 5px;
  filter: brightness(100%);
  z-index: 99;
}
.close-icon:hover {
  backdrop-filter: blur(20px);
  transform: scale(1.1);
}

@media screen and (max-width: 980px) {
  .title {
    height: auto;
    margin-bottom: 20px;
    font-size: 24px;
  }
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 16px;
  }
}
</style>
