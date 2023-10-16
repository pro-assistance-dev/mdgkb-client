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
        <MainBigNewsCard :news="newsMain" />
      </div>
      <div class="main-news-block-middle">
        <div class="size"><NewsCard :news="newsSubMain1" :main="true" /></div>
        <div class="size"><NewsCard :news="newsSubMain2" :main="true" /></div>
      </div>
      <div class="main-news-block-right">
        <RecentNewsCard :main="true" :news-number="5" style="height: 100%" />
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import MainBigNewsCard from '@/components/Main/MainBigNewsCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import RecentNewsCard from '@/components/News/RecentNewsCard.vue';
import SortModel from '@/services/classes/SortModel';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import NewsFiltersLib from '@/services/Provider/libs/filters/NewsFiltersLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'MainNewsBlock',
  components: { MainContainer, NewsCard, MainBigNewsCard, RecentNewsCard },

  setup() {
    const news = computed(() => Provider.store.getters['news/news']);
    const newsMain = computed(() => Provider.store.getters['news/main']);
    const newsSubMain1 = computed(() => Provider.store.getters['news/subMain1']);
    const newsSubMain2 = computed(() => Provider.store.getters['news/subMain2']);
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
      Provider.setFilterModels(NewsFiltersLib.withoutDrafts());
      // Provider.filterQuery.value.limit = 8;
    };

    const load = async () => {
      createFilterModels();
      await Promise.all([
        Provider.store.dispatch('news/getAll', Provider.filterQuery.value),
        Provider.store.dispatch('news/getMain'),
        Provider.store.dispatch('news/getSubMain'),
      ]);
      Provider.store.commit('news/setFilteredNews');
      mounted.value = true;
    };

    Hooks.onBeforeMount(load);

    return {
      news,
      mounted,
      newsMain,
      newsSubMain1,
      newsSubMain2,
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

.main-news-block-middle > .size:first-child {
  margin-bottom: 10px;
}

.main-news-block-right {
  width: 270px;
  padding-left: 15px;
}

.size {
  width: 100%;
}

@media screen and (max-width: 980px) {
  :deep(.card) {
    width: 100%;
  }

  :deep(.card-content) {
    width: 100%;
    word-wrap: break-word;
  }

  :deep(.image) {
    position: relative;
    overflow: hidden;
    padding-top: 75% !important;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  :deep(.article-card) {
    width: 220px;
    height: 320px;
    margin: 0 10px 100px 0;
    .image {
      padding-top: 180px;
    }
    :deep(.title) {
      font-size: 12px !important;
    }
    .card-meta {
      font-size: 11px;
      :deep(.anticon) {
        font-size: 12px;
        height: 12px;
      }
    }
    .tags-top {
      margin: 10px 0 0 10px;
    }
    .news-tag-link {
      font-size: 8px;
    }
  }

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
}

@media screen and (max-width: 480px) {
  .main-news-block {
    padding: 0 5px;
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
