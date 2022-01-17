<template>
  <div class="card">
    <h4>Читайте также</h4>
    <el-divider />
    <el-table :data="recentNewsList" cell-class-name="cell-row" :show-header="false">
      <el-table-column>
        <template #default="scope">
          <div class="recent-news-item" @click="getNewsAndRecent(scope.row.slug)">
            <div class="item-title">{{ scope.row.title }}</div>
            <div class="item-footer">
              <div class="item-date">{{ $dateFormatRu(scope.row.publishedOn, true) }}</div>
              <div class="icon">
                <EyeOutlined />
                <span>{{ scope.row.viewsCount }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="recent-news-footer">
      <button @click="$router.push('/news')">Все новости</button>
    </div>
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import INews from '@/interfaces/news/INews';
import INewsToTag from '@/interfaces/news/INewsToTag';

export default defineComponent({
  name: 'RecentNewsCard',
  components: { EyeOutlined },

  setup() {
    const store = useStore();
    const recentNewsList = computed(() => store.getters['news/news'].filter((item: INews) => item.id !== news.value.id).slice(0, 3));
    const news: Ref<INews> = computed(() => store.getters['news/newsItem']);
    const router = useRouter();
    onBeforeMount(async () => {
      // const params: INewsParams = {
      //   limit: 5,
      //   orderByView: true,
      // };
      let filterTags: string[] = [];
      news.value.newsToTags.forEach((newsToTag: INewsToTag) => {
        if (newsToTag.tagId) {
          filterTags.push(newsToTag.tagId);
        }
      });
      // if (filterTags.length) {
      //   params.filterTags = filterTags;
      // }
      // await store.dispatch('news/getAll', params);
      // await store.dispatch('news/getAll');
    });

    const getNewsAndRecent = async (slug: string): Promise<void> => {
      await router.push(`/news/${slug}`);
      await store.dispatch('news/getAll');
    };

    return {
      getNewsAndRecent,
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
h4 {
  color: black;
  margin: 0;
}
.item-footer {
  color: #a1a7bd;
}

:deep(.cell-row) {
  cursor: pointer;
}
.el-divider {
  margin: 10px 0 0;
}
:deep(.cell) {
  padding: 0 !important;
}
.recent-news-footer {
  margin: 10px;
  margin-bottom: 0;
  text-align: center;
  button {
    background-color: white;
    border-radius: 10px;
    padding: 7px 20px;
    font-size: 14px;
    border: 1px solid #4a4a4a;
    transition: background-color 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: darken(white, 10%);
    }
  }
}
</style>
