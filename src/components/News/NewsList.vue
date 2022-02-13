<template>
  <div v-if="mount">
    <!-- <NewsCarousel /> -->
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <div class="left-side-container">
          <NewsEventsButtons @load="loadNews" />
          <NewsCalendar />
          <NewsFilters />
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
        <div v-if="!allNewsLoaded" class="load-more">
          <div class="loadmore-button">
            <LoadMoreButton @loadMore="loadMore" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import LoadMoreButton from '@/components/LoadMoreButton.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import NewsEventsButtons from '@/components/News/NewsEventsButtons.vue';
import NewsFilters from '@/components/News/NewsFilters.vue';

export default defineComponent({
  name: 'NewsList',
  components: { NewsEventsButtons, NewsCalendar, NewsCard, NewsFilters, LoadMoreButton },
  emits: ['add', 'remove'],
  setup() {
    const store = useStore();
    const loading = ref(false);
    const allNewsLoaded = computed(() => store.getters['news/allNewsLoaded']);
    const mount = ref(false);

    const news = computed(() => store.getters['news/news']);

    const loadNews = async () => {
      store.commit('news/clearNews');
      await store.dispatch('news/getAll');
      store.commit('news/setFilteredNews');
    };

    onBeforeMount(async () => {
      await loadNews();
      mount.value = true;
    });

    const loadMore = async () => {
      loading.value = true;
      await store.dispatch('news/getAll');
      // store.commit('news/setFilteredNews');
    };

    return {
      allNewsLoaded,
      loading,
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

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
