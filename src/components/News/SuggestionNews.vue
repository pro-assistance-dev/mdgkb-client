<template>
  <div class="card-item">
    <h4>Читайте также</h4>
    <el-divider />
    <NewsSmallList :news-list="suggestionNews" />
    <div class="recent-news-footer">
      <router-link to="/news">
        <button>Все новости</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';

import News from '@/classes/News';
import NewsSmallList from '@/components/News/NewsSmallList.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'SuggestionNews',
  components: { NewsSmallList },
  props: {
    newsNumber: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    const generalNewsId = Provider.route().params['slug'];
    const suggestionNews: ComputedRef<News[]> = computed(() => {
      return Provider.store.getters['news/items'].filter((item: News) => item.id !== generalNewsId).slice(0, props.newsNumber);
    });

    const loadRelatedNews = async () => {
      await Provider.store.dispatch('news/getSuggestionNews', generalNewsId);
    };

    onBeforeMount(async () => {
      await loadRelatedNews();
    });

    return {
      suggestionNews,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
