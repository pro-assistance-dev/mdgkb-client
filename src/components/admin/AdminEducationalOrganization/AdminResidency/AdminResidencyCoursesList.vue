<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
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
          <router-link :to="`/admin/residency/courses/${scope.row.getMainSpecialization().slug}`">
            {{ scope.row.getMainSpecialization().name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Руководитель" min-width="300">
        <template #default="scope">
          <div v-if="scope.row.getMainTeacher()">
            {{ scope.row.getMainTeacher().doctor.human.getFullName() }}
          </div>
          <div v-else>Руководителя нет</div>
        </template>
      </el-table-column>
      <el-table-column label="Год обучения" align="center" width="200">
        <template #default="scope">
          {{ scope.row.getPeriod() }}
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
            @edit="open(scope.row.getMainSpecialization().slug)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination :show-confirm="isEditMode" @save="save" @cancel="cancel" />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import SortList from '@/components/SortList/SortList.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminResidencyCoursesList',
  components: { TableButtonGroup, AdminListWrapper, Pagination, SortList, FiltersList },
  setup() {
    const mounted = ref(false);
    const route = useRoute();
    const residencyCourses: Ref<IResidencyCourse[]> = computed(() => Provider.store.getters['residencyCourses/items']);
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = () => Provider.router.push(`${route.path}/new`);
    const open = (id: string) => Provider.router.push(`${route.path}/${id}`);
    const remove = async (id: string) => await Provider.store.dispatch('residencyCourses/remove', id);
    const edit = () => {
      if (isEditMode.value) {
        return;
      }
      isEditMode.value = true;
      isNotEditMode.value = false;
    };
    const save = async (next?: NavigationGuardNext) => {
      if (!isEditMode.value) {
        return;
      }
      saveButtonClick.value = true;
      await Provider.store.dispatch('residencyCourses/updateMany');
      isEditMode.value = false;
      isNotEditMode.value = true;
      if (next) next();
    };
    const cancel = () => {
      isEditMode.value = false;
      isNotEditMode.value = true;
    };

    const loadCourses = async () => {
      Provider.store.commit('residencyCourses/clearItems');
      await Provider.store.dispatch('residencyCourses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.store.commit('residencyCourses/clearItems');
      Provider.setSortModels(ResidencyCoursesSortsLib.byName(Orders.Asc));
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Программы ординатуры',
        buttons: [
          { text: 'Редактировать', type: 'success', action: edit, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: save, condition: isEditMode },
          { text: 'Добавить программу', type: 'primary', action: create },
        ],
      });
      await Provider.store.dispatch('residencyCourses/getAll', Provider.filterQuery.value);
      window.addEventListener('beforeunload', beforeWindowUnload);
      mounted.value = true;
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'residencyCourses', action: 'getAll' },
      sortModels: [],
    });

    const createResidencySortModels = (): ISortModel[] => {
      return createSortModels(ResidencyCoursesSortsLib);
    };

    const { confirmLeave, saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();
    watch(isEditMode, () => {
      confirmLeave.value = isEditMode.value;
    });
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    const createFilterModels = (): IFilterModel[] => {
      return [
        ResidencyCoursesFiltersLib.onlyThisYear(),
        ResidencyCoursesFiltersLib.notThisYear(),
        ResidencyCoursesFiltersLib.beforeThisYear(),
      ];
    };

    return {
      isEditMode,
      mounted,
      residencyCourses,
      remove,
      open,
      create,
      loadCourses,
      createResidencySortModels,
      cancel,
      edit,
      save,
      createFilterModels,
    };
  },
});
</script>

<style scoped></style>
