<template>
  <div class="card-meta" style="margin-bottom: 0">
    <div v-if="article" class="date-meta">
      {{ $dateTimeFormatter.format(news.publishedOn, { month: 'long', day: 'numeric', year: 'numeric' }) }}
    </div>
    <div v-else class="date-meta">
      {{ $dateTimeFormatter.format(news.publishedOn, { month: 'long', day: 'numeric', year: 'numeric' }) }}
    </div>
    <div class="icons">
      <div class="icon">
        <EyeOutlined />
        <span>{{ news.viewsCount }} </span>
      </div>
      <NewsLikes :news="news" />
    </div>
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';

import News from '@/classes/News';
import NewsLikes from '@/components/News/NewsLike.vue';

export default defineComponent({
  name: 'NewsMeta',
  components: { EyeOutlined, NewsLikes },
  props: {
    news: {
      type: Object as PropType<News>,
      required: true,
    },
    article: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #a1a7bd;
  font-size: 13px;
  margin-bottom: 10px;
  opacity: 0.75;
}
.icon {
  user-select: none;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  margin-right: 10px;

  .anticon {
    padding-right: 5px;
  }
}
.icons {
  display: flex;
}
:deep(.anticon) {
  font-size: 17px;
  height: 17px;
}
</style>
