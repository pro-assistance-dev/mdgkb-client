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
          <el-col v-for="item in news" :key="item.id" :xl="8" :lg="8" :md="12" :sm="12"
            :style="{ padding: '10px', display: 'flex' }">
            <div style="margin: 0 auto">
              <NewsCard :news="item" />
            </div>
          </el-col>
        </el-row>
        <!-- <LoadMoreButton v-if="!allNewsLoaded" :loading="loading" @loadMore="loadMore" /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import News from '@/classes/News';
import Hooks from '@/services/Hooks/Hooks';
import { Operators } from '@/services/interfaces/Operators';
import NewsFiltersLib from '@/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/libs/sorts/NewsSortsLib';
import Provider from '@/services/Provider/Provider';
import Pagination from '@/services/classes/filters/Pagination';

const emits = defineEmits(['add', 'remove'])

const allNewsLoaded = computed(() => Provider.store.getters['news/allNewsLoaded']);
const mount = ref(false);
const loading = ref(false);

const news: ComputedRef<News[]> = Store.Items('news')
const ftsp = FTSP.Get()

const setDefaultPagination = () => {
  ftsp.p = new Pagination();
  ftsp.p.limit = 6;
  ftsp.p.cursorMode = true;
};

const loadNews = async () => {
  ftsp.reset()
  setDefaultPagination();
  ftsp.setS(NewsSortsLib.byPublishedOn())
  ftsp.setF(NewsFiltersLib.onlyPublished(), NewsFiltersLib.withoutDrafts())
  await load();
};

const load = async () => {
  setDefaultPagination();
  Provider.store.commit('news/clearNews');
  Store.FTSP('news')
  mount.value = true;
};

Hooks.onBeforeMount(loadNews);
// TODO: loadMore
const loadMore = async () => {
  loading.value = true;
  Provider.filterQuery.value.pagination.setLoadMoreV2(
    news.value[news.value.length - 1].publishedOn as unknown as string,
    'publishedOn',
    'news'
  );
  // Provider.filterQuery.value.pagination.cursor.value = news.value[news.value.length - 1].publishedOn;
  Provider.filterQuery.value.pagination.cursor.operation = Operators.Lt;
  Provider.filterQuery.value.pagination.version = 'v2';
  Provider.filterQuery.value.pagination.append = true;
  // Provider.filterQuery.value.pagination.cursor.column = ClassHelper.GetPropertyName(News).publishedOn as unknown as string;
  Provider.filterQuery.value.pagination.cursor.initial = false;
  Provider.filterQuery.value.pagination.cursorMode = true;

  await Provider.store.dispatch('news/getAll', { filterQuery: Provider.filterQuery.value });
  // Provider.store.commit('news/setFilteredNews');
  loading.value = false;
};

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
