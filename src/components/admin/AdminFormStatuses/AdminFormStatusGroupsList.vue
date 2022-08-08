<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
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
  </component>
  <AdminFormStatusGroupDialog />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import AdminFormStatusGroupDialog from '@/components/admin/AdminFormStatuses/AdminFormStatusGroupDialog.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminFormStatusGroupsList',
  components: { TableButtonGroup, AdminListWrapper, AdminFormStatusGroupDialog },

  setup() {
    const formStatusGroups: ComputedRef<IFormStatusGroup[]> = computed(() => Provider.store.getters['formStatusGroups/items']);
    const formStatusGroup: ComputedRef<IFormStatusGroup> = computed(() => Provider.store.getters['formStatusGroups/item']);
    const mounted: Ref<boolean> = ref(false);

    const load = async () => {
      await Provider.store.dispatch('formStatusGroups/getAll');
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Группы статусов заявок',
        buttons: [{ text: 'Создать группу', type: 'primary', action: create }],
      });
      mounted.value = true;
    };

    Hooks.onBeforeMount(load);

    const remove = async (id: string) => {
      await Provider.store.dispatch('formStatusGroups/remove', id);
    };

    const edit = async (id: string) => {
      Provider.router.push({ name: 'AdminFormStatusesList', params: { groupId: id } });
    };

    const create = () => {
      Provider.store.commit('formStatusGroups/setDialogTitle', 'Добавить группу');
      Provider.store.commit('formStatusGroups/resetItem');
      Provider.store.commit('formStatusGroups/toggleDialog', true);
    };

    const openDialog = async (id?: string) => {
      if (id) {
        await Provider.store.dispatch('formStatusGroups/get', id);
        Provider.store.commit('formStatusGroups/setDialogTitle', formStatusGroup.value.name);
      } else {
        Provider.store.commit('formStatusGroups/setDialogTitle', 'Добавить группу');
        Provider.store.commit('formStatusGroups/resetItem');
      }
      Provider.store.commit('formStatusGroups/toggleDialog', true);
    };

    return {
      formStatusGroups,
      remove,
      mounted,
      openDialog,
      edit,
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
</style>
