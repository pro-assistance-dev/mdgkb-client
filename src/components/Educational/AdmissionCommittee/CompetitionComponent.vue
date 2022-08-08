<template>
  <div v-if="mounted">
    <el-collapse v-model="activeName" accordion @change="collapseChange">
      <el-collapse-item id="Конкурс" class="card-item" name="Конкурс">
        <template #title>
          <h2>Конкурс человек на место</h2>
        </template>
        <CompetitionPlacesTable :residency-courses="residencyCourses" />
      </el-collapse-item>

      <el-collapse-item id="РЕЙТИНГ" class="card-item" name="РЕЙТИНГ">
        <template #title>
          <h2>РЕЙТИНГ АБИТУРИЕНТОВ ПОДАВШИХ ДОКУМЕНТЫ В ОРДИНАТУРУ ГБУЗ «МОРОЗОВСКАЯ ДГКБ ДЗМ»</h2>
        </template>
        <CompetitionRating :residency-courses="residencyCourses" />
      </el-collapse-item>

      <el-collapse-item id="АБИТУРИЕНТЫ" class="card-item" name="АБИТУРИЕНТЫ">
        <template #title>
          <h2>АБИТУРИЕНТЫ, ПОДАВШИЕ ДОКУМЕНТЫ В ОРДИНАТУРУ ГБУЗ «МОРОЗОВСКАЯ ДГКБ ДЗМ»</h2>
        </template>
        <CompetitionApplicationsTable :residency-courses="residencyCourses" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import CompetitionApplicationsTable from '@/components/Educational/AdmissionCommittee/CompetitionApplicationsTable.vue';
import CompetitionPlacesTable from '@/components/Educational/AdmissionCommittee/CompetitionPlacesTable.vue';
import CompetitionRating from '@/components/Educational/AdmissionCommittee/CompetitionRating.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'CompetitionComponent',
  components: {
    CompetitionPlacesTable,
    CompetitionApplicationsTable,
    CompetitionRating,
  },
  setup() {
    const mounted: Ref<boolean> = ref(false);
    const residencyCourses: Ref<IResidencyCourse[]> = computed<IResidencyCourse[]>(() => Provider.store.getters['residencyCourses/items']);
    const activeName = ref('Конкурс');

    const loadPrograms = async () => {
      Provider.resetFilterQuery();
      Provider.setFilterModels(ResidencyCoursesFiltersLib.onlyThisYear());
      Provider.setSortModels(ResidencyCoursesSortsLib.byName(Orders.Asc));
      Provider.filterQuery.value.pagination.cursorMode = false;
      await Provider.store.dispatch('residencyCourses/getAll', Provider.filterQuery.value);
      mounted.value = true;
    };

    const collapseChange = () => {
      if (activeName.value) {
        scroll(`#${activeName.value}`);
      }
    };

    const initLoad = async () => {
      await loadPrograms();
    };

    Hooks.onBeforeMount(initLoad);

    return { residencyCourses, mounted, activeName, collapseChange };
  },
});
</script>

<style lang="scss" scoped>
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
</style>
