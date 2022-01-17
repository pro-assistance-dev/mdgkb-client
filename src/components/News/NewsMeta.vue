<template>
  <div class="card-meta" style="margin-bottom: 0">
    <div class="date-meta">{{ $dateFormatRu(news.publishedOn, true) }}</div>
    <div class="icon">
      <EyeOutlined />
      <span>{{ news.viewsCount }} </span>
    </div>
    <NewsLikes :news="news" />
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';

import NewsLikes from '@/components/News/NewsLike.vue';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'NewsMeta',
  components: { EyeOutlined, NewsLikes },
  props: {
    news: {
      type: Object as PropType<INews>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4a4a4a;
  font-size: 16px;
  margin-bottom: 10px;
  opacity: 0.75;
}
.icon {
  user-select: none;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  margin-right: 3px;

  .anticon {
    padding-right: 5px;
    font-size: 20px;
    height: 20px;
  }
}
</style>
