<template>
  <AdminListWrapper v-if="mounted" show-header :store="UsersStore">
    <template #header>
      <SortSelect class="filters-block" :store-mode="true" @load="loadUsers" />
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
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import User from '@/classes/User';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import UsersSortsLib from '@/libs/sorts/UsersSortsLib';

const users: User[] = UsersStore.Items();
const mounted: Ref<boolean> = ref(false);

// const create = (): void => {
//   Router.To('/admin/users/new');
// };

const remove = async (id: string): Promise<void> => {
  await UsersStore.Remove(id);
};
const edit = (id: string): void => {
  Router.To(`/admin/users/${id}`);
};

const loadUsers = async (): Promise<void> => {
  await UsersStore.FTSP();
};

const load = async () => {
  await loadUsers();
  PHelp.AdminUI.Head.Set('Пользователи', [Button.Success('Создаить', open)]);
  mounted.value = true;
};

Hooks.onBeforeMount(load, {
  sortsLib: UsersSortsLib,
});

const loginAs = async (email: string) => {
  await AuthStore.LoginAs(email);
  await Router.To('/');
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
