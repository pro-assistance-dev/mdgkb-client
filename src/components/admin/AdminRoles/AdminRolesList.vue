<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="roles" :data="roles">
        <el-table-column label="Название" sortable>
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
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
import IRole from '@/interfaces/IRole';

export default defineComponent({
  name: 'AdminRolesList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const roles: ComputedRef<IRole[]> = computed<IRole[]>(() => store.getters['roles/items']);

    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = (): void => {
      router.push('/admin/roles/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('roles/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/roles/${id}`);
    };
    const updateAll = async (): Promise<void> => {
      await store.dispatch('roles/updateAll');
      isEditMode.value = false;
      isNotEditMode.value = true;
    };
    const openEditMode = () => {
      isEditMode.value = true;
      isNotEditMode.value = false;
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('roles/getAll');
      store.commit('roles/seedFormStatusToFormStatuses');
      store.commit('admin/setHeaderParams', {
        title: 'Роли юзеров',
        buttons: [
          { text: 'Редактировать', type: 'success', action: openEditMode, condition: isNotEditMode },
          { text: 'Сохранить', type: 'success', action: updateAll, condition: isEditMode },
          { text: 'Добавить', type: 'primary', action: create },
        ],
      });
      store.commit('admin/closeLoading');
    });

    return {
      roles,
      create,
      remove,
      edit,
      isEditMode,
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
