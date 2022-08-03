<template>
  <div v-if="mounted" class="flex-column">
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
        <el-table-column label="Время регистрации" sortable>
          <template #default="scope">
            <span>{{ $dateTimeFormatter.format(scope.row.createdAt, { hour: 'numeric', minute: 'numeric' }) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              :show-more-button="true"
              @remove="remove(scope.row.id)"
              @edit="edit(scope.row.id)"
              @showMore="loginAs(scope.row.email)"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination />
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IUser from '@/interfaces/IUser';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'AdminUsersList',
  components: { TableButtonGroup, Pagination },

  setup() {
    const users: ComputedRef<IUser[]> = computed<IUser[]>(() => Provider.store.getters['users/items']);
    const roles: ComputedRef<IUser[]> = computed<IUser[]>(() => Provider.store.getters['roles/items']);
    const mounted: Ref<boolean> = ref(false);
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: Ref<boolean> = ref(true);

    const create = (): void => {
      Provider.router.push('/admin/users/new');
    };
    const remove = async (id: string): Promise<void> => {
      await Provider.store.dispatch('users/remove', id);
    };
    const edit = (id: string): void => {
      Provider.router.push(`/admin/users/${id}`);
    };

    const load = async (filterQuery: IFilterQuery) => {
      await Provider.store.dispatch('users/getAll', filterQuery);
      await Provider.store.dispatch('roles/getAll', filterQuery);
      mounted.value = true;
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'users', action: 'getAll' },
      sortModels: [],
      adminHeader: {
        title: 'Пользователи',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      },
    });

    const loginAs = async (email: string) => {
      await Provider.store.dispatch('auth/loginAs', email);
      await Provider.router.push('/');
    };

    return {
      loginAs,
      mounted,
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
