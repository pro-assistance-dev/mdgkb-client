<template>
  <component :is="'AdminListWrapper'" show-header>
    <template #header>
      <SortList class="filters-block" :store-mode="true" :models="sortList" @load="loadUsers" />
    </template>
    <el-table v-if="users" :data="users">
      <el-table-column prop="email" label="email" sortable>
        <template #default="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fullName" label="Имя" sortable>
        <template #default="scope">
          <span>{{ scope.row.human.getFullName() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Время регистрации" sortable>
        <template #default="scope">
          <span>{{ $dateTimeFormatter.format(scope.row.createdAt, { hour: 'numeric', minute: 'numeric' }) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            :show-more-button="true"
            @remove="remove(scope.row.id)"
            @edit="edit(scope.row.id)"
            @show-more="loginAs(scope.row.email)"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import User from '@/classes/User';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import UsersSortsLib from '@/libs/sorts/UsersSortsLib';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminUsersList',
  components: { TableButtonGroup, AdminListWrapper },

  setup() {
    const users: ComputedRef<User[]> = computed<User[]>(() => Provider.store.getters['users/items']);
    const roles: ComputedRef<User[]> = computed<User[]>(() => Provider.store.getters['roles/items']);
    const mounted: Ref<boolean> = ref(false);
    const isEditMode: Ref<boolean> = ref(false);

    const create = (): void => {
      Provider.router.push('/admin/users/new');
    };
    const remove = async (id: string): Promise<void> => {
      await Provider.store.dispatch('users/remove', id);
    };
    const edit = (id: string): void => {
      Provider.router.push(`/admin/users/${id}`);
    };

    const loadUsers = async (): Promise<void> => {
      await Provider.store.dispatch('users/getAll');
    };

    const load = async () => {
      await Provider.store.dispatch('users/getAll');
      await Provider.store.dispatch('roles/getAll');
      // Provider.setSortList(...createSortModels(UsersSortsLib));
      await loadUsers();
      mounted.value = true;
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'users', action: 'getAll' },
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
      sortList: Provider.sortList,
      loadUsers,
    };
  },
});
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
