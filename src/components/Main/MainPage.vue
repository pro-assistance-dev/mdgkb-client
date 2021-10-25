<template>
  <NewsCarousel />
  <el-row :gutter="40">
    <el-col :xl="6" :lg="6" :md="24" class="calendar">
      <div class="left-side-container">
        <NewsCalendar />

        <el-card class="divisions-list">
          <el-table height="800" :data="list" cell-class-name="cell-row" header-cell-class-name="cell-header">
            <el-table-column header-align="center">
              <template #header>
                <h2 class="division-list-title">Отделения</h2>
                <el-input
                  v-model="divisionFilter"
                  prefix-icon="el-icon-search"
                  placeholder="Найти отделение"
                  class="table-search"
                  size="mini"
                />
              </template>
              <template #default="scope">
                <el-space @click="$router.push(`/divisions/${scope.row.id}`)">
                  <i class="el-icon-link icon"> </i>
                  <span> {{ scope.row.name }}</span>
                </el-space>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :xl="18" :lg="18" :md="24">
      <el-row>
        <el-col>
          <h1>Последние новости</h1>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-for="item in filteredNews" :key="item.id" :xl="8" :lg="8" :md="12" :sm="12" :style="{ padding: '10px', display: 'flex' }">
          <div style="margin: 0 auto">
            <NewsCard :news="item" />
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h1>Наши врачи</h1>
        </el-col>
      </el-row>

      <div v-for="item in doctors" :key="item.id" class="doctors-wrapper">
        <DoctorInfoCard :doctor="item" :division="item.division" />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/DoctorInfoCard.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import NewsCarousel from '@/components/NewsCarousel.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import INewsParams from '@/interfaces/news/INewsParams';
import ITag from '@/interfaces/news/ITag';

export default defineComponent({
  name: 'MainPage',
  components: { NewsCalendar, NewsCard, NewsCarousel, DoctorInfoCard },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const allNewsLoaded = computed(() => store.getters['news/allNewsLoaded']);
    const filteredNews = computed(() => store.getters['news/filteredNews']);
    const filterTags = computed(() => store.getters['news/filterTags']);

    const divisions: Ref<IDivision[]> = ref([]);
    const selectedDivision = computed(() => store.getters['divisions/division']);
    const doctors = computed(() => store.getters['doctors/doctors']);
    const divisionFilter = ref('');
    const defaultParams: INewsParams = { limit: 3 };
    const news = computed(() => store.getters['news/news']);

    const loadNews = async () => {
      await store.dispatch('news/getAll', defaultParams);
      await store.commit('news/setFilteredNews');
    };

    onBeforeMount(async () => {
      await loadNews();
      await loadDivisions();
      await loadDoctors();
    });

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

    // Methods
    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      divisions.value = store.getters['divisions/divisions'];
    };

    const loadDoctors = async (): Promise<void> => {
      await store.dispatch('doctors/getAll');
    };

    const list: ComputedRef<IDivision[]> = computed((): IDivision[] => {
      if (divisionFilter.value) {
        return divisions.value.filter((o) => o.name.toLowerCase().includes(divisionFilter.value.toLowerCase()));
      } else {
        return divisions.value;
      }
    });

    return {
      doctors,
      divisionFilter,
      divisions,
      selectedDivision,
      list,
      loadDivisions,

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

.divisions-list {
  margin-top: 20px;
}

:deep(.cell-row) {
  padding: 5px 0;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
h1 {
  text-align: center;
}
.division-list-title {
  margin-top: 0;
}
</style>
