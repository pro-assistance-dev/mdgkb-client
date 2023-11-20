<template>
  <component
    :is="'MainContainer'"
    v-if="mounted"
    header-button-link="/news"
    header-title="Главные новости"
    header-button-title="Все новости"
  >
    <div class="wrapper">
      <div class="main-news-block-left">
        <MainBigNewsCard :news="newsMain" />
      </div>
      <div class="height1"></div>
      <div class="main-news-block-middle1">
        <div class="size"><NewsCard :news="newsSubMain1" :main="true" /></div>
        <div class="size"><NewsCard :news="newsSubMain2" :main="true" /></div>
      </div>
      <div class="height2"></div>
      <div class="main-news-block-right">
        <RecentNewsCard :news-list="recentNewsList" :main="true" :news-number="5" style="height: 100%" />
      </div>
    </div>
    <div class="main-news-block-middle2">
      <div class="size"><NewsCard :news="newsSubMain1" :main="true" /></div>
      <div class="size"><NewsCard :news="newsSubMain2" :main="true" /></div>
    </div>
    <div class="main-news-block-right2">
      <RecentNewsCard :news-list="recentNewsList" :main="true" :news-number="5" style="height: 100%" />
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import MainBigNewsCard from '@/components/Main/MainBigNewsCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import RecentNewsCard from '@/components/News/RecentNewsCard.vue';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import NewsFiltersLib from '@/services/Provider/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/services/Provider/libs/sorts/NewsSortsLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'MainNewsBlock',
  components: { MainContainer, NewsCard, MainBigNewsCard, RecentNewsCard },

  setup() {
    const news = computed(() => Provider.store.getters['news/items']);
    const newsMain = computed(() => Provider.store.getters['news/main']);
    const newsSubMain1 = computed(() => Provider.store.getters['news/subMain1']);
    const newsSubMain2 = computed(() => Provider.store.getters['news/subMain2']);
    const recentNewsList = computed(() => Provider.store.getters['news/mainPageRecentNewsList']);
    const mounted: Ref<boolean> = ref(false);

    const createFilterModels = () => {
      Provider.setSortModels(NewsSortsLib.byMain(), NewsSortsLib.bySubMain(), NewsSortsLib.byPublishedOn(Orders.Desc));
      Provider.setFilterModels(NewsFiltersLib.withoutDrafts());
    };

    const load = async () => {
      createFilterModels();
      await Provider.store.dispatch('news/getAll', { filterQuery: Provider.filterQuery.value });
      await Provider.store.dispatch('news/getMain', true);
      await Provider.store.dispatch('news/getSubMain', true);
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
      recentNewsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.height1 {
  height: 623px;
}

.height2 {
  height: 623px;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 631px 1fr 270px 1fr 270px;
  grid-column-gap: 10px;
  grid-row-gap: 1em;
  align-items: stretch;
  justify-items: center;
}
.main-news-block {
  display: flex;
  justify-content: space-between;
  height: auto;
}

.main-news-block-left {
  display: flex;
  width: 100%;
  height: auto;
}

.main-news-block-middle1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
}

.main-news-block-right {
  width: 100%;
  height: auto;
}

.main-news-block-right2 {
  display: none;
}

.main-news-block-middle2 {
  display: none;
}

.size {
  height: 47%;
}

@media screen and (max-width: 1280px) {
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 20fr 1fr 10fr 0.01fr 0.01fr;
    grid-column-gap: 10px;
    align-items: stretch;
    justify-items: center;
  }
  .main-news-block {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .main-news-block-left {
    display: flex;
    height: 100%;
  }

  .main-news-block-middle1 {
    justify-content: space-between;
    height: 100%;
  }

  .main-news-block-right {
    display: none;
  }

  .main-news-block-right2 {
    display: block;
    width: 100%;
    padding-top: 30px;
    padding-left: 0;
  }
}

@media screen and (max-width: 1024px) {
  .size {
    height: 49%;
  }
}

@media screen and (max-width: 980px) {
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 10px;
    align-items: stretch;
    justify-items: center;
  }

  .height1 {
    display: none;
  }

  .height2 {
    display: none;
  }
  .main-news-block {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .main-news-block-left {
    display: flex;
    height: 100%;
  }

  .main-news-block-middle1 {
    display: none;
  }

  .main-news-block-middle2 {
    display: flex;
    justify-content: space-between;
    height: 100%;
    margin-top: 30px;
  }

  .main-news-block-right {
    display: none;
  }

  .main-news-block-right2 {
    display: block;
    width: 100%;
    padding-top: 30px;
    padding-left: 0;
  }

  .size {
    width: 48%;
    height: auto;
  }
}
</style>
