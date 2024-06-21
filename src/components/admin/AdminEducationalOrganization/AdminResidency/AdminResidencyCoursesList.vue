<template>
  <AdminListWrapper pagination show-header>
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
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            @remove="remove(scope.row.id)"
            @edit="Router.ToAdmin('residency-courses/' + scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import ResidencyCourse from '@/classes/ResidencyCourse';
import FilterModel from '@/services/classes/filters/FilterModel';
import SortModel from '@/services/classes/SortModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import ResidencyCoursesFiltersLib from '@/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/libs/sorts/ResidencyCoursesSortsLib';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

const residencyCourses: Ref<ResidencyCourse[]> = Store.Items('residencyCourses');
const isEditMode: Ref<boolean> = ref(false);

const save = async (next?: NavigationGuardNext) => {
  saveButtonClick.value = true;
  await Provider.store.dispatch('residencyCourses/updateMany');
  isEditMode.value = false;
  if (next) next();
};

const loadCourses = async () => {
  await Store.FTSP('residencyCourses');
};

const load = async () => {
  PHelp.AdminHead().Set('Программы ординатуры', [
    Button.Success(
      computed(() => (isEditMode.value ? 'Сохранить' : 'Редактировать')),
      computed(() => (isEditMode.value ? save : () => (isEditMode.value = !isEditMode.value)))
    ),
    Button.Success('Добавить программу', Provider.createAdmin),
  ]);
  await loadCourses();
};

Hooks.onBeforeMount(load, {
  sortsLib: ResidencyCoursesSortsLib,
  pagination: { storeModule: 'residencyCourses' },
});

const createResidencySortModels = (): SortModel[] => {
  return createSortModels(ResidencyCoursesSortsLib);
};

watch(isEditMode, () => {
  confirmLeave.value = isEditMode.value;
});

// onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   showConfirmModal(save, next);
// });

const createFilterModels = (): FilterModel[] => {
  return [ResidencyCoursesFiltersLib.onlyThisYear(), ResidencyCoursesFiltersLib.notThisYear(), ResidencyCoursesFiltersLib.beforeThisYear()];
};
</script>

<style scoped></style>
