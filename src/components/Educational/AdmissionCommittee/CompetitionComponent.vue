<template>
  <div v-if="mounted">
    <div class="card-item">
      <h2>АБИТУРИЕНТЫ, ПОДАВШИЕ ДОКУМЕНТЫ В ОРДИНАТУРУ ГБУЗ «МОРОЗОВСКАЯ ДГКБ ДЗМ»</h2>
      <CompetitionApplicationsTable :residency-courses="residencyCourses" />
    </div>

    <div class="card-item">
      <h2>РЕЙТИНГ АБИТУРИЕНТОВ ПОДАВШИХ ДОКУМЕНТЫ В ОРДИНАТУРУ ГБУЗ «МОРОЗОВСКАЯ ДГКБ ДЗМ»</h2>
      <CompetitionRating :residency-courses="residencyCourses" />
    </div>

    <div class="card-item">
      <h2>Конкурс человек на место</h2>
      <CompetitionPlacesTable :residency-courses="residencyCourses" />
    </div>
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

    const loadPrograms = async () => {
      Provider.resetFilterQuery();
      Provider.setFilterModels(ResidencyCoursesFiltersLib.onlyThisYear());
      Provider.setSortModels(ResidencyCoursesSortsLib.byName(Orders.Asc));
      Provider.filterQuery.value.pagination.cursorMode = false;
      await Provider.store.dispatch('residencyCourses/getAll', Provider.filterQuery.value);
      mounted.value = true;
    };

    const initLoad = async () => {
      await loadPrograms();
    };

    Hooks.onBeforeMount(initLoad);

    return { residencyCourses, mounted };
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
}
</style>
