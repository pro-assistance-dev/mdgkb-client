<template>
  <AdminListWrapper pagination show-header :store="DivisionsStore">
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
import ISearchObject from '@/services/interfaces/ISearchObject';

const divisions = DivisionsStore.Items();
const addDivision = () => Router.To(`/admin/divisions/new`);
const sortList: Ref<SortModel[]> = ref([]);

const edit = async (id: string): Promise<void> => {
  await Router.To(`/admin/divisions/${id}`);
};

const remove = async (id: string) => {
  await DivisionsStore.Remove(id);
};

const loadDivisions = async (): Promise<void> => {
  await DivisionsStore.FTSP();
};

const load = async (): Promise<void> => {
  sortList.value = [DivisionsSortsLib.byName(), DivisionsSortsLib.byCommentsCount()];
  FTSP.Get().setF(DivisionsSortsLib.byName());
  await loadDivisions();
  PHelp.AdminUI.Head.Set('Отделения', [Button.Success('Добавить отделение', addDivision)]);
};

Hooks.onBeforeMount(load, {
  sortsLib: DivisionsSortsLib,
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Router.To(`/admin/divisions/${event.id}`);
};

const createFilterModels = (): FilterModel[] => {
  return [];
};

const update = async (division: Division) => await DivisionsStore.Update(division);
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
