<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="formStatuses" :data="formStatuses">
        <el-table-column label="Название" sortable>
          <template #default="scope">
            <span>{{ scope.row.label }}</span>
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
            >
              <el-option v-for="item in formStatusToFormStatuses" :key="item.id" :label="item.childFormStatus.label" :value="item" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @remove="remove(scope.row.id)"
              @edit="edit(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';

export default defineComponent({
  name: 'AdminFormStatusesList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => store.getters['formStatuses/items']);
    const formStatusToFormStatuses: ComputedRef<IFormStatusToFormStatus[]> = computed<IFormStatusToFormStatus[]>(
      () => store.getters['formStatuses/formStatusToFormStatuses']
    );
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = (): void => {
      router.push('/admin/form-statuses/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('formStatuses/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/form-statuses/${id}`);
    };
    const updateAll = async (): Promise<void> => {
      await store.dispatch('formStatuses/updateAll');
      isEditMode.value = false;
      isNotEditMode.value = true;
    };
    const openEditMode = () => {
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('formStatuses/getAll');
      store.commit('formStatuses/seedFormStatusToFormStatuses');
      store.commit('admin/setHeaderParams', {
        title: 'Статусы форм',
        buttons: [
          { text: 'Редактировать', type: 'success', action: openEditMode, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: updateAll, condition: isEditMode },
          { text: 'Добавить', type: 'primary', action: create },
        ],
      });
      store.commit('admin/closeLoading');
    });

    return {
      formStatuses,
      create,
      remove,
      edit,
      isEditMode,
      formStatusToFormStatuses,
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
