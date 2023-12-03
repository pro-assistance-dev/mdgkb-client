<template>
  <div class="card-item">
    <template v-if="!main">
      <h4>Читайте также</h4>
      <el-divider />
    </template>
    <el-table :data="recentNewsList" cell-class-name="cell-row" :show-header="false">
      <el-table-column>
        <template #default="scope">
          <div class="recent-news-item" @click="getNewsAndRecent(scope.row.id)">
            <div class="item-title">{{ scope.row.title }}</div>
            <div class="item-footer">
              <div class="item-date">
                {{ $dateTimeFormatter.format(scope.row.publishedOn, { month: 'long', day: 'numeric', year: 'numeric' }) }}
              </div>
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
      <router-link to="/news">
        <button>Все новости</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref } from 'vue';

import News from '@/classes/News';
import router from '@/router';
import Provider from '@/services/Provider/Provider';

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
    const recentNewsList = computed(() => {
      return Provider.store.getters['news/items'].filter((item: News) => item.id !== news.value.id).slice(0, props.newsNumber);
    });
    const news: Ref<News> = computed(() => Provider.store.getters['news/item']);

    const loadRelatedNews = async () => {
      await Provider.store.dispatch('news/getSuggestionNews', Provider.route().params['slug']);
    };

    onBeforeMount(async () => {
      if (props.main) {
        return;
      }
      await loadRelatedNews();
    });

    const getNewsAndRecent = async (slug: string): Promise<void> => {
      await router.push(`/news/${slug}`);
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

:deep(.el-table),
:deep(.el-table__body-wrapper),
:deep(.el-table__body) {
  height: 100%;
}
</style>
