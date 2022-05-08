<template>
  <component
    :is="'MainContainer'"
    v-if="mounted"
    header-button-link="/news"
    header-title="Главные новости"
    header-button-title="Все новости"
  >
    <div class="main-news-block">
      <div class="main-news-block-left">
        <MainBigNewsCard :news="news[7]" />
      </div>
      <div class="main-news-block-middle">
        <div class="size"><NewsCard :news="news[1]" :main="true" /></div>
        <div class="size"><NewsCard :news="news[2]" :main="true" /></div>
      </div>
      <div class="main-news-block-right">
        <RecentNewsCard :main="true" :news-number="5" />
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import SortModel from '@/classes/filters/SortModel';
import MainBigNewsCard from '@/components/Main/MainBigNewsCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import RecentNewsCard from '@/components/News/RecentNewsCard.vue';
import { Orders } from '@/interfaces/filters/Orders';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'MainNewsBlock',
  components: { MainContainer, NewsCard, MainBigNewsCard, RecentNewsCard },

  setup() {
    const news = computed(() => Provider.store.getters['news/news']);
    const mounted: Ref<boolean> = ref(false);

    const createFilterModels = () => {
      const modelForMainNews = SortModel.CreateSortModel(Provider.schema.value.news.tableName, Provider.schema.value.news.main);
      const modelForSubMainNews = SortModel.CreateSortModel(Provider.schema.value.news.tableName, Provider.schema.value.news.subMain);
      const modelForPublishedOnMainNews = SortModel.CreateSortModel(
        Provider.schema.value.news.tableName,
        Provider.schema.value.news.publishedOn,
        Orders.Desc
      );
      Provider.setSortModels(modelForMainNews, modelForSubMainNews, modelForPublishedOnMainNews);
      Provider.filterQuery.value.limit = 8;
    };

    const load = async () => {
      createFilterModels();
      await Provider.store.dispatch('news/getAll', Provider.filterQuery.value);
      await Provider.store.commit('news/setFilteredNews');
      mounted.value = true;
    };

    Hooks.onBeforeMount(load);

    return {
      news,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-news-block {
  display: flex;
  justify-content: space-between;
  height: auto;
}

.main-news-block-left {
  display: flex;
  width: 47%;
  padding-right: 10px;
  max-height: 800px;
}

.main-news-block-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
}

.main-news-block-right {
  width: 270px;
  padding-left: 15px;
}

.size {
  width: 100%;
}

@media screen and (max-width: 980px) {
  .size {
    width: 48%;
    height: auto;
  }

  .colomn {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .main-news-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0 15px;
  }

  .main-news-block-left {
    display: flex;
    width: 100%;
    height: 600px;
    padding-bottom: 30px;
  }

  .main-news-block-middle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .main-news-block-right {
    width: 100%;
    padding-top: 30px;
    padding-left: 0;
  }
  :deep(.main-page-container-header-title) {
    margin-left: 15px;
    letter-spacing: 0;
  }
}

@media screen and (max-width: 480px) {
  .main-news-block {
    padding: 0 5px;
  }

  :deep(.main-page-container-header-title) {
    margin-left: 15px;
    letter-spacing: 0;
    font-size: 18px;
  }

  :deep(.main-page-container-header button) {
    font-size: 12px;
    margin: 0px;
  }

  :deep(.el-icon) {
    width: 0.5em;
    height: 0.5em;
  }
  :deep(.el-icon svg) {
    width: 0.5em;
    height: 0.5em;
    padding-bottom: 6px;
  }
}
</style>
