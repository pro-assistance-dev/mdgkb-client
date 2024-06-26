<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch
        :must-be-translated="true"
        :key-value="'employee'"
        placeholder="Начните вводить ФИО сотрудника"
        @select="selectSearch"
      />
      <FiltersList :models="createGenderFilterModels()" @load="loadItems" />
      <el-select :model-value="selectedMode.label" clearable @change="selectMode" @clear="resetFilter">
        <el-option v-for="mode in modes" :key="mode.label" :label="mode.label" :value="mode.label" />
      </el-select>
      <el-button class="reset" @click="resetFilter">Сбросить фильтры</el-button>
      <el-button v-if="selectedMode && (selectedMode.isClassOf(Head) || selectedMode.isClassOf(EducationalAcademic))" @click="editOrder"
        >Редактировать порядок</el-button
      >
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadItems" />
    </template>
    <el-table :data="employees" :border="false">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Должности" sortable>
        <template #default="scope">
          <el-tag
            v-for="mode in modes.filter((m) => m.condition(scope.row))"
            :key="mode.label"
            size="mini"
            class="tag"
            @click="selectMode(mode.label)"
            >{{ mode.label }}</el-tag
          >
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
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>

  <el-dialog v-model="editOrderMode">
    <OrderedList
      v-if="editOrderMode"
      :sort-model="selectedMode.sortModel"
      :store-module="selectedMode.store"
      @close="editOrderMode = false"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
import EducationalAcademic from '@/classes/EducationalAcademic';
import Head from '@/classes/Head';
import modes, { ListMode } from '@/components/admin/AdminEmployees/employeesModes';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import EmployeesFiltersLib from '@/libs/filters/EmployeesFiltersLib';
import EmployeesSortsLib from '@/libs/sorts/EmployeesSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

const selectedMode: Ref<ListMode> = ref(modes[0]);
const employees = Store.Items('employees');
const editOrderMode: Ref<boolean> = ref(false);
const mounted = ref(false);

const load = async () => {
  const findedMode = modes?.find((m: ListMode) => {
    if (m.filter) {
      return Provider.filterQuery.value.findFilterModel(m.filter());
    }
  });
  if (findedMode) {
    selectedMode.value = findedMode;
  }
  await Store.FTSP('employees');

  PHelp.AdminHead().Set('Сотрудники', [Button.Success('Добавить сотрудника', Provider.createAdmin)]);

  mounted.value = true;
};

Hooks.onBeforeMount(load, {
  sortsLib: EmployeesSortsLib,
  pagination: { storeModule: 'employees', action: 'ftsp' },
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push({ name: `AdminEditEmployeePage`, params: { id: event.value } });
};

const createGenderFilterModels = (): FilterModel[] => {
  return [EmployeesFiltersLib.onlyMale(), EmployeesFiltersLib.onlyFemale()];
};

const resetFilterModels = () => {
  Provider.dropPagination();
  Provider.filterQuery.value.reset();
  Provider.setDefaultSortModel();
};

const selectMode = async (modeLabel: string) => {
  const findedMode = modes.find((m: ListMode) => m.label === modeLabel);
  if (!findedMode) {
    return;
  }
  selectedMode.value = findedMode;
  resetFilterModels();
  if (selectedMode.value.filter) {
    Provider.setFilterModel(selectedMode.value.filter());
  }
  await Provider.loadItems();
  await Provider.router.replace({ query: { q: Provider.filterQuery.value.toUrlQuery() } });
};

const resetFilter = async () => {
  resetFilterModels();
  selectedMode.value = modes[0];
  await Provider.loadItems();
};

const editOrder = () => {
  if (!selectedMode.value) {
    return;
  }
  editOrderMode.value = true;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

.reset {
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: $normal-darker-border;
  border-radius: 20px;
  background: #ffffff;
  color: #343d5c;
  padding: 0 20px;
  transition: 0.3s;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 10px;
}

.reset:hover {
  background: #dff2f8;
}

.tag {
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
