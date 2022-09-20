<template>
  <!-- <NewsCarousel /> -->
  <el-row v-if="mounted" :gutter="40">
    <el-col :xl="6" :lg="6" :md="24" class="calendar">
      <div class="left-side-container">
        <NewsCalendar />

        <el-card class="divisions-list">
          <el-table height="1100" :data="list" cell-class-name="cell-row" header-cell-class-name="cell-header">
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
                <el-space @click="$router.push({ name: 'DivisionPage', params: { id: scope.row.id, slug: scope.row.slug } })">
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
        <h1>Главная</h1>
        <NewsCard :news="mainNews" />
      </el-row>
      <el-row>
        <h1>2 главных</h1>
        <NewsCard :news="subMainNews[0]" />
        <NewsCard :news="subMainNews[1]" />
      </el-row>
      <el-row>
        <h1>6 недавних</h1>

        <el-col v-for="item in recentNews" :key="item.id" :xl="8" :lg="8" :md="12" :sm="12" :style="{ padding: '10px', display: 'flex' }">
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

      <div class="doctors-wrapper">
        <DoctorInfoCard v-for="item in doctors" :key="item.id" :doctor="item" />
      </div>

      <el-row>
        <el-col>
          <h1>Последние комментарии</h1>
        </el-col>
      </el-row>

      <el-carousel
        ref="carouselRef"
        v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
        height="250px"
        :interval="5000"
        indicator-position="outside"
      >
        <el-carousel-item v-for="(comment, i) in comments" :key="i">
          <CommentCard :comment="comment" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import CommentCard from '@/components/Main/CommentCard.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import IComment from '@/interfaces/comments/IComment';
import IDivision from '@/interfaces/IDivision';

export default defineComponent({
  name: 'MainPageOldVersion',
  components: { NewsCalendar, NewsCard, DoctorInfoCard, CommentCard },
  setup() {
    const store = useStore();
    const loading: Ref<boolean> = ref<boolean>(false);
    const mounted: Ref<boolean> = ref<boolean>(false);
    const carouselRef = ref();

    const divisions: Ref<IDivision[]> = ref([]);
    const selectedDivision = computed(() => store.getters['divisions/division']);
    const doctors = computed(() => store.getters['doctors/items']);
    const divisionFilter = ref('');
    const mainNews = computed(() => store.getters['news/main']);
    const subMainNews = computed(() => store.getters['news/subMain']);
    const recentNews = computed(() => store.getters['news/recent']);
    const comments: ComputedRef<IComment[]> = computed<IComment[]>(() => store.getters['comments/comments']);

    const loadNews = async () => {
      store.commit('news/clearNews');
      // await store.dispatch('news/getAllMain');
      await store.commit('news/setFilteredNews');
    };

    onBeforeMount(async () => {
      await loadNews();
      // await loadDivisions();
      // await loadDoctors();
      // await loadComments();
      mounted.value = true;
    });

    // Methods
    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      divisions.value = store.getters['divisions/divisions'];
    };

    // const loadDoctors = async (): Promise<void> => {
    //   const filters: IFilterQuery = store.getters['filter/filterQuery'];
    //   filters.limit = 8;
    //   filters.main = true;
    //   await store.dispatch('doctors/getAll', filters);
    // };

    // const loadComments = async (): Promise<void> => {
    //   const params = new CommentParams();
    //   params.positive = true;
    //   params.limit = 10;
    //   await store.dispatch('comments/getAll', params);
    // };

    const list: ComputedRef<IDivision[]> = computed((): IDivision[] => {
      if (divisionFilter.value) {
        return divisions.value.filter((o) => o.name.toLowerCase().includes(divisionFilter.value.toLowerCase()));
      } else {
        return divisions.value;
      }
    });

    return {
      mainNews,
      subMainNews,
      recentNews,
      doctors,
      divisionFilter,
      divisions,
      selectedDivision,
      list,
      loadDivisions,
      carouselRef,
      loading,
      comments,
      mounted,
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
.doctors-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
