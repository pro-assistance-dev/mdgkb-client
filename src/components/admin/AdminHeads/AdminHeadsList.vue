<template>
  <AdminListWrapper v-if="mounted">
    <el-table :data="items">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Должность" align="center" sortable>
        <template #default="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import HeadsSortsLib from '@/services/Provider/libs/sorts/HeadsSortsLib';

export default defineComponent({
  name: 'AdminHeadsList',
  components: { TableButtonGroup },
  setup() {
    Hooks.onBeforeMount(Provider.loadItems, {
      adminHeader: {
        title: 'Руководители',
        buttons: [{ text: 'Добавить руководителя', type: 'primary', action: Provider.createAdmin }],
      },
      sortsLib: HeadsSortsLib,
    });

    return { ...Provider.getAdminLib() };
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
</style>
