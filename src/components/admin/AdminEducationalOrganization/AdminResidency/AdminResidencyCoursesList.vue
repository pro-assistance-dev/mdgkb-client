<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <SortList class="filters-block" :models="createResidencySortModels()" @load="loadCourses" />
      <FiltersList :models="createFilterModels()" @load="loadCourses" />
    </template>
    <el-table :data="residencyCourses">
      <el-table-column label="Код специализации" min-width="200" class-name="sticky-left">
        <template #default="scope">
          <div v-for="residencyCoursesSpecialization in scope.row.residencyCoursesSpecializations" :key="residencyCoursesSpecialization.id">
            {{ residencyCoursesSpecialization.specialization.code }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Специализация" min-width="300">
        <template #default="scope">
          <!-- <router-link :to="`/admin/residency/courses/${scope.row.getMainSpecialization().id}`"> -->
          {{ scope.row.getMainSpecialization().name }}
          <!-- </router-link> -->
        </template>
      </el-table-column>
      <el-table-column label="Руководитель" min-width="300">
        <template #default="scope">
          <div v-if="scope.row.mainTeacherId">
            {{ scope.row.mainTeacher.human.getFullName() }}
          </div>
          <div v-else>Руководителя нет</div>
        </template>
      </el-table-column>
      <el-table-column label="Год обучения" align="center" width="200">
        <template #default="scope">
          {{ scope.row.getPeriod() }}
        </template>
      </el-table-column>
      <el-table-column label="Шаблон формы" align="center" width="200">
        <template #default="scope">
          {{ scope.row.formPattern.title }}
        </template>
      </el-table-column>

      <el-table-column label="Количество платных мест" align="center" width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.paidPlaces" size="small" />
          </div>
          <div v-else>
            {{ scope.row.paidPlaces }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Количество бюджетных мест" align="center" width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.freePlaces" size="small" />
          </div>
          <div v-else>
            {{ scope.row.freePlaces }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Стоимость" align="center" width="200">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.cost" size="small" />
          </div>
          <div v-else>
            {{ scope.row.cost }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import ResidencyCourse from '@/classes/ResidencyCourse';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import SortList from '@/components/SortList/SortList.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import SortModel from '@/services/classes/SortModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminResidencyCoursesList',
  components: { TableButtonGroup, AdminListWrapper, SortList, FiltersList },
  setup() {
    const residencyCourses: Ref<ResidencyCourse[]> = computed(() => Provider.store.getters['residencyCourses/items']);
    const isEditMode: Ref<boolean> = ref(false);

    const save = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      await Provider.store.dispatch('residencyCourses/updateMany');
      isEditMode.value = false;
      if (next) next();
    };

    const loadCourses = async () => {
      await Provider.store.dispatch('residencyCourses/getAllWithCount', Provider.filterQuery.value);
    };

    const load = async () => {
      await loadCourses();
      window.addEventListener('beforeunload', beforeWindowUnload);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Сотрудники',
        buttons: [
          {
            text: computed(() => (isEditMode.value ? 'Сохранить' : 'Редактировать')),
            action: computed(() => (isEditMode.value ? save : () => (isEditMode.value = !isEditMode.value))),
          },
          { text: 'Добавить программу', type: 'primary', action: Provider.createAdmin },
        ],
      },
      sortsLib: ResidencyCoursesSortsLib,
      getAction: 'getAllWithCount',
    });
    const createResidencySortModels = (): SortModel[] => {
      return createSortModels(ResidencyCoursesSortsLib);
    };

    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();
    watch(isEditMode, () => {
      confirmLeave.value = isEditMode.value;
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    const createFilterModels = (): FilterModel[] => {
      return [
        ResidencyCoursesFiltersLib.onlyThisYear(),
        ResidencyCoursesFiltersLib.notThisYear(),
        ResidencyCoursesFiltersLib.beforeThisYear(),
      ];
    };

    return {
      ...Provider.getAdminLib(),
      isEditMode,
      residencyCourses,
      loadCourses,
      createResidencySortModels,
      save,
      createFilterModels,
    };
  },
});
</script>

<style scoped></style>
