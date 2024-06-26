<template>
  <AdminListWrapper pagination show-header>
    <el-table :data="divisions">
      <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
      <el-table-column prop="entrance.building.name" label="Корпус" sortable> </el-table-column>
      <el-table-column prop="address" label="Корпус" sortable> </el-table-column>
      <el-table-column prop="phone" label="Номер телефона" sortable> </el-table-column>
      <el-table-column prop="email" label="Email" sortable> </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.show" @change="update(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import Division from '@/classes/Division';
import DivisionsSortsLib from '@/libs/sorts/DivisionsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import SortModel from '@/services/classes/SortModel';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

const divisions = Store.Items('divisions');
const addDivision = () => Provider.router.push(`/admin/divisions/new`);
const sortList: Ref<SortModel[]> = ref([]);

const edit = async (id: string): Promise<void> => {
  const item = divisions.value.find((i: Division) => i.id === id);
  if (item) {
    await Provider.router.push(`/admin/divisions/${id}`);
  }
};

const remove = async (id: string) => {
  await Store.Remove('divisions', id);
};

const loadDivisions = async (): Promise<void> => {
  await Store.FTSP('divisions');
};

const load = async (): Promise<void> => {
  // Provider.setSortModels(DivisionsSortsLib.byName());
  sortList.value = [DivisionsSortsLib.byName(), DivisionsSortsLib.byCommentsCount()];
  FTSP.Get().setF(DivisionsSortsLib.byName());
  // Provider.setSortList(...createSortModels(DivisionsSortsLib));
  await loadDivisions();
  PHelp.AdminHead().Set('Отделения', [Button.Success('Добавить отделение', addDivision)]);
};

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'divisions', action: 'ftsp' },
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push(`/admin/divisions/${event.id}`);
};

const createFilterModels = (): FilterModel[] => {
  return [];
};

const update = async (division: Division) => await Store.Update('divisions', division);
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
</style>
