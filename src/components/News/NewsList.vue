<template>
  <NewsCarousel />
  <el-row :gutter="40">
    <el-col :xl="6" :lg="6" :md="24" class="calendar">
      <div class="left-side-container">
        <NewsCalendar />
        <NewsFilters />
      </div>
    </el-col>
    <el-col :xl="18" :lg="18" :md="24">
      <el-row>
        <el-col v-for="item in filteredNews" :key="item.id" :xl="8" :lg="8" :md="12" :sm="12" :style="{ padding: '10px', display: 'flex' }">
          <div style="margin: 0 auto">
            <NewsCard :news="item" />
          </div>
        </el-col>
      </el-row>
      <div v-if="!allNewsLoaded" class="load-more">
        <el-button @click="loadMore">Загрузить ещё</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import NewsFilters from '@/components/News/NewFilters.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import NewsCarousel from '@/components/NewsCarousel.vue';
import INewsParams from '@/interfaces/news/INewsParams';
import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'NewsList',
  components: { NewsCalendar, NewsCard, NewsFilters, NewsCarousel },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const allNewsLoaded = computed(() => store.getters['news/allNewsLoaded']);
    const filteredNews = computed(() => store.getters['news/filteredNews']);
    const filterTags = computed(() => store.getters['news/filterTags']);

    const defaultParams: INewsParams = { limit: 6 };
    const news = computed(() => store.getters['news/news']);

    const loadNews = async () => {
      await store.dispatch('news/getAll', defaultParams);
      await store.commit('news/setFilteredNews');
    };

    onMounted(loadNews);

    const loadMore = async () => {
      loading.value = true;
      const params: INewsParams = {
        publishedOn: news.value[news.value.length - 1].publishedOn,
        limit: 6,
        filterTags: filterTags.value.map((tag: ITag) => tag.id),
      };
      await store.dispatch('news/getAll', params);
      await store.commit('news/setFilteredNews');
    };

    return {
      allNewsLoaded,
      loading,
      loadMore,
      news,
      filteredNews,
    };
  },
});
</script>

<style scoped lang="scss">
.calendar {
  margin-bottom: 40px;
}
.load-more {
  margin: 50px 0 50px 0;
  text-align: center;
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
</style>
