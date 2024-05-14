<template>
  <AdminListWrapper>
    <el-table v-if="formStatuses" :data="formStatuses">
      <el-table-column label="Название" sortable>
        <template #default="scope">
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Название группы" sortable>
        <template #default="scope">
          <span>{{ scope.row.formStatusGroup.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Доступные статусы" sortable>
        <template #default="scope">
          <div v-if="!isEditMode">
            <div v-for="item in scope.row.formStatusToFormStatuses" :key="item.id">
              {{ item.childFormStatus.label }}
            </div>
          </div>
          <el-select v-else v-model="scope.row.formStatusToFormStatuses" value-key="childFormStatusId" multiple
            placeholder="Выберите статусы" style="width: 100%"
            @remove-tag="(i) => scope.row.removeFormStatusToFormStatuses(i)">
            <el-option v-for="item in formStatusesByGroupId(scope.row.formStatusGroupId)" :key="item.id"
              :label="item.childFormStatus.label" :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)"
            @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import FormStatus from '@/classes/FormStatus';
import FormStatusGroup from '@/classes/FormStatusGroup';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

const formStatuses: ComputedRef<FormStatus[]> = Store.Items('formStatuses');
const formStatusGroup: ComputedRef<FormStatusGroup> = Store.Item('formStatusGroups');
const formStatusToFormStatuses: ComputedRef<FormStatusToFormStatus[]> = Store.Getters('formStatuses/formStatusToFormStatuses')
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: Ref<boolean> = ref(true);

const create = (): void => {
  Provider.router.push({ name: 'AdminFormStatusPageCreate', params: { groupId: Provider.route().params['groupId'] } });
};

const remove = async (id: string): Promise<void> => {
  await Provider.store.dispatch('formStatuses/remove', id);
};

const edit = (id: string): void => {
  Provider.router.push({ name: 'AdminFormStatusPageUpdate', params: { groupId: Provider.route().params['groupId'], id } });
};

const updateAll = async (): Promise<void> => {
  await Store.UpdateAll('formStatuses')
  isEditMode.value = false;
  isNotEditMode.value = true;
};
const openEditMode = () => {
  isEditMode.value = true;
  isNotEditMode.value = false;
};

const load = async () => {
  // if (Provider.route().params['groupId']) {
  //   await Provider.store.dispatch('formStatuses/getAllByGroupId', Provider.route().params['groupId']);
  // } else {
  await Store.FTSP('formStatuses');
  // }
  await Store.Get('formStatusGroups', Provider.route().params['groupId']);
  Store.Commit('formStatuses/seedFormStatusToFormStatuses');
  Store.Commit('admin/setHeaderParams', {
    title: Provider.route().params['groupId'] ? `Статусы формы ${formStatusGroup.value.name}` : 'Статусы форм',
    showBackButton: true,
    buttons: [
      { text: 'Редактировать', type: 'success', action: openEditMode, condition: isNotEditMode },
      { text: 'Сохранить', type: 'success', action: updateAll, condition: isEditMode },
      { text: 'Добавить', type: 'primary', action: create },
    ],
  });
};

const formStatusesByGroupId = (groupId: string): FormStatusToFormStatus[] => {
  return formStatusToFormStatuses.value.filter((fs: FormStatusToFormStatus) => fs.childFormStatus.formStatusGroupId === groupId);
};

Hooks.onBeforeMount(load);
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
