<template>
  <AdminListWrapper v-if="mounted" pagination>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadItems" />
    </template>
    <el-table :data="items" :border="false">
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
import { defineComponent } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/interfaces/ISearchObject';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import TeachersFiltersLib from '@/services/Provider/libs/filters/TeachersFiltersLib';
import TeachersSortsLib from '@/services/Provider/libs/sorts/TeachersSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminTeachersList',
  components: { AdminListWrapper, TableButtonGroup, SortList },
  setup() {
    Hooks.onBeforeMount(Provider.loadItems, {
      pagination: { storeModule: 'teachers', action: 'getAll' },
      adminHeader: {
        title: 'Преподаватели',
        buttons: [{ text: 'Добавить преподавателя', type: 'primary', action: Provider.createAdmin }],
      },
      sortsLib: TeachersSortsLib,
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditTeacherPage`, params: { id: event.value } });
    };

    const createGenderFilterModels = (): IFilterModel[] => {
      return [TeachersFiltersLib.onlyMale(), TeachersFiltersLib.onlyFemale()];
    };

    return {
      // teachers,
      ...Provider.getAdminLib(),
      mounted: Provider.mounted,
      schema: Provider.schema,
      selectSearch,
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
