<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch :key-value="schema.employee.key" placeholder="Начните вводить ФИО сотрудника" @select="selectSearch" />
      <FiltersList :models="createGenderFilterModels()" @load="loadEmployees" />
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadEmployees" />
    </template>
    <el-table :data="employees" :border="false">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Пол" align="center" sortable>
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата рождения" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.human.dateBirth) }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            @edit="edit(scope.row.human.slug)"
            @remove="remove(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortListV2.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import ISearchObject from '@/interfaces/ISearchObject';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import EmployeesFiltersLib from '@/services/Provider/libs/filters/EmployeesFiltersLib';
import EmployeesSortsLib from '@/services/Provider/libs/sorts/EmployeesSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminEmployeeList',
  components: { AdminListWrapper, TableButtonGroup, RemoteSearch, SortList, FiltersList },
  setup() {
    const employees = computed(() => Provider.store.getters['employees/items']);
    const genderFilter: Ref<FilterModel> = ref(new FilterModel());

    const loadEmployees = async () => {
      await Provider.store.dispatch('employees/getAllWithCount', Provider.filterQuery.value);
    };
    // http://localhost:8080/admin/employees?q=?s=model=employee&col=fullName&label=%D0%9F%D0%BE+%D0%A4%D0%98%D0%9E+(%D0%BF%D0%BE+%D0%B2%D0%BE%D0%B7%D1%80%D0%B0%D1%81%D1%82%D0%B0%D0%BD%D0%B8%D1%8E)&default=true&version=v2&id=b7387e54-564c-4944-9fc2-9309b84eca75&order=asc|
    const load = async () => {
      await Provider.filterQuery.value.fromUrlQuery(Provider.route().query);
      Provider.filterQuery.value.setSortModel(EmployeesSortsLib.byFullName(Orders.Asc));
      await Provider.router.replace({ query: { q: Provider.filterQuery.value.toUrlQuery() } });

      Provider.setSortList(...createSortModels(EmployeesSortsLib));
      await loadEmployees();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Врачи',
        buttons: [{ text: 'Добавить сотрудника', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'employees', action: 'getAllWithCount' },
      sortModels: [],
    });

    const create = () => Provider.router.push(`/admin/employees/new`);
    const edit = (slug: string) => Provider.router.push(`/admin/employees/${slug}`);
    const remove = async (id: string) => await Provider.store.dispatch('employees/remove', id);
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditEmployeePage`, params: { id: event.value } });
    };

    const createGenderFilterModels = (): FilterModel[] => {
      return [EmployeesFiltersLib.onlyMale(), EmployeesFiltersLib.onlyFemale()];
    };

    return {
      employees,
      remove,
      edit,
      create,
      mounted: Provider.mounted,
      schema: Provider.schema,
      selectSearch,
      genderFilter,
      loadEmployees,
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
