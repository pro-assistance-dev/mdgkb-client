<template>
  <AdminListWrapper v-if="mounted" pagination>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadTeachers" />
    </template>
    <el-table :data="teachers" :border="false">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Пол" align="center" sortable>
        <template #default="scope">
          {{ scope.row.employee.human.getGender() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата рождения" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.employee.human.dateBirth) }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            @edit="edit(scope.row.employee.human.slug)"
            @remove="remove(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import ISearchObject from '@/interfaces/ISearchObject';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import TeachersFiltersLib from '@/services/Provider/libs/filters/TeachersFiltersLib';
import TeachersSortsLib from '@/services/Provider/libs/sorts/TeachersSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminTeachersList',
  components: { AdminListWrapper, TableButtonGroup, SortList },
  setup() {
    const teachers = computed(() => Provider.store.getters['teachers/items']);
    const genderFilter: Ref<IFilterModel> = ref(new FilterModel());

    const loadTeachers = async () => {
      await Provider.store.dispatch('teachers/getAll', Provider.filterQuery.value);
    };
    const filterByDivision: Ref<IFilterModel> = ref(new FilterModel());
    const load = async () => {
      Provider.setSortList(...createSortModels(TeachersSortsLib));
      Provider.setSortModels(TeachersSortsLib.byFullName(Orders.Asc));
      await loadTeachers();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Преподаватели',
        buttons: [{ text: 'Добавить преподавателя', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'teachers', action: 'getAll' },
      sortModels: [],
    });

    const create = () => Provider.router.push(`/admin/teachers/new`);
    const edit = (slug: string) => Provider.router.push(`/admin/teachers/${slug}`);
    const remove = async (id: string) => await Provider.store.dispatch('teachers/remove', id);
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditTeacherPage`, params: { id: event.value } });
    };

    const createGenderFilterModels = (): IFilterModel[] => {
      return [TeachersFiltersLib.onlyMale(), TeachersFiltersLib.onlyFemale()];
    };

    return {
      filterByDivision,
      teachers,
      remove,
      edit,
      create,
      mounted: Provider.mounted,
      schema: Provider.schema,
      selectSearch,
      genderFilter,
      loadTeachers,
      sortList: Provider.sortList,
      createGenderFilterModels,
      DataTypes,
      Operators,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.tag-link {
  margin: 2px;
  transition: all 0.2s;
  color: blue;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}
</style>
