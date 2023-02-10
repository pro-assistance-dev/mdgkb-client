<template>
  <div v-if="mount">
    <!-- <NewsCarousel /> -->
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <div class="left-side-container">
          <NewsEventsButtons @load="load" />
          <NewsFilters @load="load" @load-news="loadNews" />
        </div>
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <el-row>
          <el-col v-for="item in news" :key="item.id" :xl="8" :lg="8" :md="12" :sm="12" :style="{ padding: '10px', display: 'flex' }">
            <div style="margin: 0 auto">
              <NewsCard :news="item" />
            </div>
          </el-col>
        </el-row>
        <LoadMoreButton v-if="!allNewsLoaded" @loadMore="loadMore" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';

import LoadMoreButton from '@/components/LoadMoreButton.vue';
import HelperElena from '@/components/Main/HelperElena.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import NewsEventsButtons from '@/components/News/NewsEventsButtons.vue';
import NewsFilters from '@/components/News/NewsFilters.vue';
import { Operators } from '@/interfaces/filters/Operators';
import INews from '@/interfaces/news/INews';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import NewsFiltersLib from '@/services/Provider/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/services/Provider/libs/sorts/NewsSortsLib';

export default defineComponent({
  name: 'NewsList',
  components: { NewsEventsButtons, NewsCard, NewsFilters, LoadMoreButton },
  emits: ['add', 'remove'],
  setup() {
    const allNewsLoaded = computed(() => Provider.store.getters['news/allNewsLoaded']);
    const mount = ref(false);
    const loading = ref(false);

    const news: ComputedRef<INews[]> = computed(() => Provider.store.getters['news/news']);

    const loadNews = async () => {
      Provider.resetFilterQuery();
      Provider.filterQuery.value.pagination.limit = 6;
      Provider.filterQuery.value.pagination.cursorMode = true;
      Provider.setSortModels(NewsSortsLib.byPublishedOn());
      Provider.setFilterModels(NewsFiltersLib.onlyPublished());
      Provider.setFilterModels(NewsFiltersLib.withoutDrafts());
      await load();
    };

    const load = async () => {
      Provider.store.commit('news/clearNews');
      await Provider.store.dispatch('news/getAll', Provider.filterQuery.value);
      Provider.store.commit('news/setFilteredNews');
      mount.value = true;
    };

    Hooks.onBeforeMount(loadNews);

    const loadMore = async () => {
      loading.value = true;
      Provider.filterQuery.value.pagination.cursor.value = news.value[news.value.length - 1].publishedOn;
      Provider.filterQuery.value.pagination.cursor.operation = Operators.Lt;
      Provider.filterQuery.value.pagination.cursor.column = Provider.schema.value.news.publishedOn;
      Provider.filterQuery.value.pagination.cursor.tableName = Provider.schema.value.news.tableName;
      Provider.filterQuery.value.pagination.cursor.initial = false;
      Provider.filterQuery.value.pagination.cursorMode = true;

      await Provider.store.dispatch('news/getAll', Provider.filterQuery.value);
      // Provider.store.commit('news/setFilteredNews');
    };

    return {
      load,
      loading,
      allNewsLoaded,
      loadMore,
      loadNews,
      news,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
.calendar {
  margin-bottom: 40px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.left-side-container {
  margin: 10px auto;
  max-width: 700px;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
