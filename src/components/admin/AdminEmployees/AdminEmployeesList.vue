<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch :key-value="schema.employee.key" placeholder="Начните вводить ФИО сотрудника" @select="selectSearch" />
      <FiltersList :models="createGenderFilterModels()" @load="loadItems" />
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadItems" />
    </template>

    <el-table :data="items" :border="false">
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
import { defineComponent } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortListV2.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import EmployeesFiltersLib from '@/services/Provider/libs/filters/EmployeesFiltersLib';
import EmployeesSortsLib from '@/services/Provider/libs/sorts/EmployeesSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminEmployeeList',
  components: { AdminListWrapper, TableButtonGroup, RemoteSearch, SortList, FiltersList },
  setup() {
    Hooks.onBeforeMount(Provider.loadItems, {
      adminHeader: {
        title: 'Сотрудники',
        buttons: [{ text: 'Добавить сотрудника', type: 'primary', action: Provider.createAdmin }],
      },
      sortsLib: EmployeesSortsLib,
      getAction: 'getAllWithCount',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditEmployeePage`, params: { id: event.value } });
    };

    const createGenderFilterModels = (): FilterModel[] => {
      return [EmployeesFiltersLib.onlyMale(), EmployeesFiltersLib.onlyFemale()];
    };

    return {
      ...Provider.getAdminLib(),
      selectSearch,
      createGenderFilterModels,
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
