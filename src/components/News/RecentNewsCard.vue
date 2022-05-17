<template>
  <div class="card-item">
    <template v-if="!main">
      <h4>Читайте также</h4>
      <el-divider />
    </template>
    <el-table :data="recentNewsList" cell-class-name="cell-row" :show-header="false">
      <el-table-column>
        <template #default="scope">
          <div class="recent-news-item" @click="getNewsAndRecent(scope.row.slug)">
            <div class="item-title">{{ scope.row.title }}</div>
            <div class="item-footer">
              <div class="item-date">{{ $dateTimeFormatter.format(scope.row.publishedOn, { month: 'long' }) }}</div>
              <div class="icon">
                <EyeOutlined />
                <span>{{ scope.row.viewsCount }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!main" class="recent-news-footer">
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
  props: {
    main: {
      type: Boolean,
      default: false,
    },
    newsNumber: {
      type: Number,
      default: 3,
    },
  },

  setup(props) {
    const store = useStore();
    const recentNewsList = computed(() =>
      store.getters['news/news'].filter((item: INews) => item.id !== news.value.id).slice(0, props.newsNumber)
    );
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
      // await store.dispatch('news/getAll');
    };

    return {
      news,
      getNewsAndRecent,
      recentNewsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-item {
  padding: 0;
}
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
  margin: 15px 0 0 10px;
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
// :deep(.cell) {
// padding: 0 !important;
// }
.recent-news-footer {
  margin: 10px;
  margin-bottom: 15px;
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
