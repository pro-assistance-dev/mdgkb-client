<template>
  <el-card>
    <el-table :data="recentNewsList" cell-class-name="cell-row">
      <el-table-column header-align="center">
        <template #header>
          <h3>Читайте также</h3>
        </template>
        <template #default="scope">
          <div class="recent-news-item" @click="$router.push(`/news/${scope.row.slug}`)">
            <div class="item-title">{{ scope.row.title }}</div>
            <div class="item-footer">
              <div class="icon">
                <EyeOutlined />
                <span>{{ scope.row.viewsCount }}</span>
              </div>
              <div class="item-date">{{ $dateFormatRu(scope.row.publishedOn, true) }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';
import { useStore } from 'vuex';

import INews from '@/interfaces/news/INews';
import INewsParams from '@/interfaces/news/INewsParams';
import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'RecentNewsCard',
  components: { EyeOutlined },

  setup() {
    const store = useStore();
    const recentNewsList = computed(() => store.getters['news/news'].filter((item: INews) => item.id !== news.value.id));
    const news: Ref<INews> = computed(() => store.getters['news/newsItem']);

    onBeforeMount(async () => {
      const params: INewsParams = {
        limit: 5,
        orderByView: true,
      };
      let filterTags: string[] = [];
      news.value.tags.forEach((tag: ITag) => {
        if (tag.id) {
          filterTags.push(tag.id);
        }
      });
      if (filterTags.length) {
        params.filterTags = filterTags;
      }
      await store.dispatch('news/getAll', params);
    });

    return {
      recentNewsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.recent-news-item {
  display: flex;
  flex-direction: column;
  .item-title {
    font-weight: 600;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .icon {
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin-right: 3px;
  }
  .anticon {
    padding-right: 5px;
    font-size: 16px;
  }
}
h3 {
  margin: 0;
  color: black;
}

:deep(.cell-row) {
  cursor: pointer;
}
</style>
