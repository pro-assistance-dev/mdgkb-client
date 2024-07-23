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
          <el-select
            v-else
            v-model="scope.row.formStatusToFormStatuses"
            value-key="childFormStatusId"
            multiple
            placeholder="Выберите статусы"
            style="width: 100%"
            @remove-tag="(i) => scope.row.removeFormStatusToFormStatuses(i)"
          >
            <el-option
              v-for="item in formStatusesByGroupId(scope.row.formStatusGroupId)"
              :key="item.id"
              :label="item.childFormStatus.label"
              :value="item"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.id)" />
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
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

const formStatuses: FormStatus[] = FormStatusesStore.Items();
const formStatusGroup: FormStatusGroup = FormStatusGroupsStore.Item();
const formStatusToFormStatuses: FormStatusToFormStatus[] = FormStatusesStore.FormStatusToFormStatuses();
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: Ref<boolean> = ref(true);

const create = (): void => {
  // Router.To({ name: 'AdminFormStatusPageCreate', params: { groupId: Router.Route().params['groupId'] } });
};

const remove = async (id: string): Promise<void> => {
  await FormStatusesStore.Remove(id);
};

const edit = (): void => {
  // Router.To({ name: 'AdminFormStatusPageUpdate', params: { groupId: Router.Route().params['groupId'], id } });
};

const updateAll = async (): Promise<void> => {
  await FormStatusesStore.UpdateMany();
  isEditMode.value = false;
  isNotEditMode.value = true;
};
const openEditMode = () => {
  isEditMode.value = true;
  isNotEditMode.value = false;
};

const load = async () => {
  await FormStatusesStore.FTSP();
  // await FormStatusGroupsStore.Get(Router.Route().params['groupId']);
  // FormStatusesStore.SeedFormStatusToFormStatuses();
  PHelp.AdminUI.Head.Set(Router.Route().params['groupId'] ? `Статусы формы ${formStatusGroup.name}` : 'Статусы форм', [
    Button.Success('Редактировать', openEditMode, isNotEditMode),
    Button.Success('Сохранить', updateAll, isEditMode),
    Button.Success('Добавить', create),
  ]);
};

const formStatusesByGroupId = (groupId: string): FormStatusToFormStatus[] => {
  return formStatusToFormStatuses.filter((fs: FormStatusToFormStatus) => fs.childFormStatus.formStatusGroupId === groupId);
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
