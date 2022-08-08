<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
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
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminFormStatusesList',
  components: { TableButtonGroup, AdminListWrapper },

  setup() {
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const formStatusGroup: ComputedRef<IFormStatusGroup> = computed(() => Provider.store.getters['formStatusGroups/item']);
    const formStatusToFormStatuses: ComputedRef<IFormStatusToFormStatus[]> = computed<IFormStatusToFormStatus[]>(
      () => Provider.store.getters['formStatuses/formStatusToFormStatuses']
    );
    const filterByGroupId: Ref<IFilterModel> = ref(new FilterModel());
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
      await Provider.store.dispatch('formStatuses/updateAll');
      isEditMode.value = false;
      isNotEditMode.value = true;
    };
    const openEditMode = () => {
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    const load = async () => {
      if (Provider.route().params['groupId']) {
        await Provider.store.dispatch('formStatuses/getAllByGroupId', Provider.route().params['groupId']);
      } else {
        await Provider.store.dispatch('formStatuses/getAll');
      }
      await Provider.store.dispatch('formStatusGroups/get', Provider.route().params['groupId']);
      Provider.store.commit('formStatuses/seedFormStatusToFormStatuses');
      Provider.store.commit('admin/setHeaderParams', {
        title: Provider.route().params['groupId'] ? `Статусы формы ${formStatusGroup.value.name}` : 'Статусы форм',
        showBackButton: true,
        buttons: [
          { text: 'Редактировать', type: 'success', action: openEditMode, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: updateAll, condition: isEditMode },
          { text: 'Добавить', type: 'primary', action: create },
        ],
      });
    };

    const formStatusesByGroupId = (groupId: string): IFormStatusToFormStatus[] => {
      console.log(formStatusToFormStatuses);
      return formStatusToFormStatuses.value.filter((fs: IFormStatusToFormStatus) => fs.childFormStatus.formStatusGroupId === groupId);
    };

    Hooks.onBeforeMount(load);

    return {
      mounted: Provider.mounted,
      formStatuses,
      create,
      remove,
      edit,
      isEditMode,
      formStatusToFormStatuses,
      formStatusesByGroupId,
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
