<template>
  <AdminListWrapper v-if="mounted">
    <el-table :data="items">
      <el-table-column v-if="isEdit" width="50" class-name="sticky-left" align="center">
        <template #default="scope">
          <TableMover :ordered-items="items" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="ФИО">
        <template #default="scope">
          {{ scope.row.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Должность" align="left">
        <template #default="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <el-table-column width="50" class-name="sticky-right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import HeadsSortsLib from '@/services/Provider/libs/sorts/HeadsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminHeadsList',
  components: { TableButtonGroup, AdminListWrapper, TableMover },
  setup() {
    const isEdit: Ref<boolean> = ref(false);
    const isNotEdit: Ref<boolean> = ref(true);

    const editOrder = () => {
      isEdit.value = true;
      isNotEdit.value = false;
    };

    const saveOrder = async () => {
      await Provider.store.dispatch('heads/updateMany');
      isEdit.value = false;
      isNotEdit.value = true;
    };

    Hooks.onBeforeMount(Provider.loadItems, {
      adminHeader: {
        title: 'Руководители',
        buttons: [
          { text: 'Редактировать порядок', type: 'success', action: editOrder, condition: isNotEdit },
          { text: 'Сохранить порядок', type: 'success', action: saveOrder, condition: isEdit },
          { text: 'Добавить руководителя', type: 'primary', action: Provider.createAdmin },
        ],
      },
      sortsLib: HeadsSortsLib,
    });

    return { ...Provider.getAdminLib(), isEdit };
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
