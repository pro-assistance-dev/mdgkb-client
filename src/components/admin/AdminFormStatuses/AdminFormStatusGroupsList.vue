<template>
  <AdminListWrapper>
    <el-table v-if="formStatusGroups" :data="formStatusGroups">
      <el-table-column label="Название">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Кодовое имя">
        <template #default="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-open-button="true"
            :show-remove-button="true"
            @remove="remove(scope.row.id)"
            @edit="openDialog(scope.row.id)"
            @open="edit(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
  <AdminFormStatusGroupDialog />
</template>

<script lang="ts" setup>
import FormStatusGroup from '@/classes/FormStatusGroup';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const formStatusGroups: ComputedRef<FormStatusGroup[]> = Store.Items('formStatusGroups');
const formStatusGroup: ComputedRef<FormStatusGroup> = Store.Item('formStatusGroup');
const mounted: Ref<boolean> = ref(false);

const load = async () => {
  await Store.FTSP('formStatusGroups');
  PHelp.AdminUI.Head.Set('Группы статусов заявок', [Button.Success('Создать', create)]);
  mounted.value = true;
};

Hooks.onBeforeMount(load);

const remove = async (id: string) => {
  await Store.Remove('formStatusGroups', id);
};

const edit = async (id: string) => {
  Provider.router.push({ name: 'AdminFormStatusesList', params: { groupId: id } });
};

const create = () => {
  Store.Commit('formStatusGroups/setDialogTitle', 'Добавить группу');
  Store.Commit('formStatusGroups/resetItem');
  Store.Commit('formStatusGroups/toggleDialog', true);
};

const openDialog = async (id?: string) => {
  if (id) {
    await Store.Get('formStatusGroups', id);
    Store.Commit('formStatusGroups/setDialogTitle', formStatusGroup.value.name);
  } else {
    Store.Commit('formStatusGroups/setDialogTitle', 'Добавить группу');
    Store.Commit('formStatusGroups/resetItem');
  }
  Store.Commit('formStatusGroups/toggleDialog', true);
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
</style>
