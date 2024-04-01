<template>
  <div v-if="mounted">
    <!-- <div class="info"> -->
    <!--   <span class="info-text" -->
    <!--     >Для получения информации о конкурсе нажмите -->
    <!--     <a v-if="isFound" target="_blank" href="/files/contest.pdf" download="Конкурс" class="info-text">сюда</a></span -->
    <!--   > -->
    <!--   <!-- <span class="info-text-alt">Информация о конкурсе временно отсутствует</span> -->
    <!-- </div> -->
    <el-collapse v-model="activeName" accordion @change="collapseChange">
      <!--      <el-collapse-item v-if="UserService.isAdmin()" id="Конкурс" class="card-item" name="Таблица конкурса">-->
      <!--        <template #title>-->
      <!--          <h2>КОНКУРС</h2>-->
      <!--        </template>-->
      <!--        <CompetitionTable :residency-courses="residencyCourses" />-->
      <!--      </el-collapse-item>-->
      <el-collapse-item id="Конкурс на место" class="card-item" name="Конкурс">
        <template #title>
          <h2>КОНКУРС ЧЕЛОВЕК НА МЕСТО</h2>
        </template>
        <!-- <CompetitionPlacesTable :residency-courses="residencyCourses" /> -->
      </el-collapse-item>

      <el-collapse-item id="РЕЙТИНГ" class="card-item" name="РЕЙТИНГ">
        <template #title>
          <h2>РЕЙТИНГ АБИТУРИЕНТОВ ПОДАВШИХ ДОКУМЕНТЫ В ОРДИНАТУРУ ГБУЗ «МОРОЗОВСКАЯ ДГКБ ДЗМ»</h2>
        </template>
        <!-- <CompetitionRating :residency-courses="residencyCourses" /> -->
      </el-collapse-item>

      <el-collapse-item id="АБИТУРИЕНТЫ" class="card-item" name="АБИТУРИЕНТЫ">
        <template #title>
          <h2>АБИТУРИЕНТЫ, ПОДАВШИЕ ДОКУМЕНТЫ В ОРДИНАТУРУ ГБУЗ «МОРОЗОВСКАЯ ДГКБ ДЗМ»</h2>
        </template>
        <!-- <CompetitionApplicationsTable :residency-courses="residencyCourses" /> -->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import ResidencyCourse from '@/classes/ResidencyCourse';
import CompetitionApplicationsTable from '@/components/Educational/AdmissionCommittee/CompetitionApplicationsTable.vue';
import CompetitionPlacesTable from '@/components/Educational/AdmissionCommittee/CompetitionPlacesTable.vue';
import CompetitionRating from '@/components/Educational/AdmissionCommittee/CompetitionRating.vue';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';
import UserService from '@/services/User';

export default defineComponent({
  name: 'CompetitionComponent',
  components: {
    CompetitionPlacesTable,
    CompetitionApplicationsTable,
    CompetitionRating,
    // CompetitionTable,
  },
  setup() {
    const mounted: Ref<boolean> = ref(false);
    const residencyCoursesSource: Ref<ResidencyCourse[]> = computed<ResidencyCourse[]>(
      () => Provider.store.getters['residencyCourses/items']
    );
    const activeName = ref('Конкурс');
    const residencyCourses: Ref<ResidencyCourse[]> = computed(() =>
      residencyCoursesSource.value.filter((r: ResidencyCourse) => r.getMainSpecialization().name !== 'Детская урология-андрология')
    );
    const loadPrograms = async () => {
      Provider.resetFilterQuery();
      Provider.setFilterModels(ResidencyCoursesFiltersLib.onlyThisYear());
      Provider.setSortModels(ResidencyCoursesSortsLib.byName(Orders.Asc));
      Provider.filterQuery.value.pagination.cursorMode = false;
      await Provider.store.dispatch('residencyCourses/getAll', Provider.filterQuery.value);
    };

    const collapseChange = () => {
      if (activeName.value) {
        setTimeout(() => {
          scroll(`#${activeName.value}`);
        }, 500);
      }
    };

    const isFound: Ref<boolean> = ref(true);

    // const found = async () => {
    //   try {
    //     let fileName = require(path);
    //     console.log("file found");
    //     console.log(fileName)
    //   } catch (e) {
    //     console.log("sorry, file not found");
    //     isFound.value = false;
    //   }
    // };

    const initLoad = async () => {
      await loadPrograms();
      // await found();
      mounted.value = true;
    };

    Hooks.onBeforeMount(initLoad);

    return { residencyCourses, mounted, activeName, collapseChange, isFound, UserService };
  },
});
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/elements/colors.scss';
:deep(.card-item) {
  margin-bottom: 10px;
  thead th {
    // font-weight: bold;
    text-align: left;
    border: none;
    padding: 10px 15px;
    background: #ededed;
    font-size: 14px;
  }
  tbody td {
    text-align: left;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    vertical-align: top;
  }
  tbody tr:nth-child(even) {
    background: #f8f8f8;
  }
  tbody tr:hover {
    background-color: #ecf5ff;
  }
}
h2 {
  text-align: center;
  font-size: 18px;
}
:deep(.el-collapse-item__header, .el-collapse-item__wrap) {
  border: none;
}
:deep(.el-collapse-item__header) {
  line-height: 1.2;
}
:deep(.el-collapse-item__wrap) {
  border-bottom: none;
}
.info {
  display: flex;
  // height: 50px;
  // background: $site_pale_green;
  border-radius: 5px;
  margin-bottom: 10px;
}

.info-text {
  text-align: center;
  margin: auto;
  height: 100%;
  width: 100%;
  background: $site_pale_green;
  font-size: 18px;
  padding: 11px 0;
  border-radius: 5px;
}

.info-text-alt {
  text-align: center;
  margin: auto;
  height: 100%;
  width: 100%;
  background: $site_pale_yellow;
  font-size: 18px;
  padding: 11px 0;
  border-radius: 5px;
}
</style>
