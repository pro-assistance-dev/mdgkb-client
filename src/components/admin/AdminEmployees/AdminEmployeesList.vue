<template>
  <AdminListWrapper v-if="mounted" show-header :store="EmployeesStore">
    <template #header>
      <RemoteSearchNew placeholder="Начните вводить ФИО сотрудника" key-value="employee" @select="selectSearch" />
      <FilterSelect default-label="Все" :models="createGenderFilterModels()" @load="loadItems" />

      <PSelect v-model="selectedMode" :clearable="selectedMode.filter" @change="selectMode" @clear="resetFilter">
        <option v-for="mode in modes" :key="mode.label" :label="mode.label" :value="mode" />
      </PSelect>
      <el-button v-if="selectedMode && (selectedMode.isClassOf(Head) || selectedMode.isClassOf(EducationalAcademic))" @click="editOrder"
        >Редактировать порядок</el-button
      >
    </template>
    <template #sort>
      <SortSelect :max-width="400" @load="loadItems" />
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
import EmployeesFiltersLib from '@/libs/filters/EmployeesFiltersLib';
import EmployeesSortsLib from '@/libs/sorts/EmployeesSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

import SortListConst from '@/services/SortList';

const selectedMode: Ref<ListMode> = ref(modes[0]);
const employees = EmployeesStore.Items();
const editOrderMode: Ref<boolean> = ref(false);
const mounted = ref(false);

const load = async () => {
  const findedMode = modes?.find((m: ListMode) => {});

  if (findedMode) {
    selectedMode.value = findedMode;
  }

  PHelp.AdminUI.Head.Set('Сотрудники', [Button.Success('Добавить сотрудника', create)]);
  await loadItems();
  mounted.value = true;
};

const loadItems = async () => {
  await EmployeesStore.FTSP();
};

const create = async () => {
  PHelp.Notification.Warning('Временно недоступно');
};

Hooks.onBeforeMount(load, {
  sortsLib: EmployeesSortsLib,
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Router.To('/admin/employees/' + event.id);
};

const createGenderFilterModels = (): FilterModel[] => {
  return [EmployeesFiltersLib.onlyMale(), EmployeesFiltersLib.onlyFemale()];
};

const selectMode = async () => {
  PHelp.Paginator.reset();
  FTSP.Get().resetF();
  if (selectedMode.value.filter) {
    FTSP.Get().setF(selectedMode.value.filter());
  }
  await loadItems();
};

const resetFilter = async () => {
  selectedMode.value = modes[0];
  SortListConst.SetDefault();
  FTSP.Get().setSortModel(SortListConst.GetDefault());
  await selectMode();
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
