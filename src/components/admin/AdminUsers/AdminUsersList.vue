<template>
  <div class="flex-column">
    <el-card>
      <el-table v-if="users" :data="users">
        <el-table-column label="email" sortable>
          <template #default="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Имя" sortable>
          <template #default="scope">
            <span>{{ scope.row.human.getFullName() }}</span>
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
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'AdminUsersList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const store = useStore();
    const users: ComputedRef<IUser[]> = computed<IUser[]>(() => store.getters['users/items']);
    const roles: ComputedRef<IUser[]> = computed<IUser[]>(() => store.getters['roles/items']);

    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = (): void => {
      router.push('/admin/users/new');
    };
    const remove = async (id: string): Promise<void> => {
      await store.dispatch('users/remove', id);
    };
    const edit = (id: string): void => {
      router.push(`/admin/users/${id}`);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('users/getAll');
      await store.dispatch('roles/getAll');
      store.commit('admin/closeLoading');
    });

    return {
      roles,
      users,
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
