<template>
  <div v-if="mounted" class="table-container">
    <table class="table-list">
      <thead>
        <th style="text-align: start">Клиентский путь</th>
        <th>
          <div class="table-title">
            <h4>Гостевой доступ</h4>
            <div>
              <el-button size="mini" @click="setAllGuests()">Выделить всё</el-button>
            </div>
          </div>
        </th>

        <th v-for="role in filteredRoles" :key="role.id" style="width 100%">
          <div class="table-title">
            <h4>{{ role.name }}</h4>
            <div>
              <el-button size="mini" @click="setAll(role.id)">Выделить всё</el-button>
            </div>
          </div>
        </th>
        <th v-if="selectRolesList.length">
          <div class="table-title">
            <div style="margin-bottom: 10px">
              <el-select v-model="chosenRole" size="mini" value-key="id" label="Роль">
                <el-option v-for="item in selectRolesList" :key="item.id" :label="item.name" :value="item"> </el-option>
              </el-select>
            </div>
            <div>
              <el-button size="mini" @click="addRole">Добавить</el-button>
              <el-button size="mini" @click="addAllRoles">Все</el-button>
            </div>
          </div>
        </th>
      </thead>
      <tbody>
        <tr v-for="permission in permissions" :key="permission.resource">
          <th>
            {{ permission.resource }}
          </th>
          <td style="text-align: center">
            <el-checkbox v-model="permission.guestAllow"> </el-checkbox>
          </td>
          <td v-for="role in filteredRoles" :key="role.id" style="text-align: center">
            <el-checkbox :model-value="permission.checkPermissionForRole(role.id)" @change="permission.setRole($event, role.id)">
            </el-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <el-table :data="permissions" height="80vh">
      <el-table-column prop="resource" label="Клиентский путь" width="300px"> </el-table-column>
      <el-table-column label="Гостевой доступ" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.guestAllow"> </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column v-for="role in roles" :key="role.id" :label="role.name" align="center">
        <template #default="scope">
          <el-checkbox :model-value="scope.row.checkPermissionForRole(role.id)" @change="scope.row.setRole($event, role.id)"> </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column v-for="role in roles" :key="role.id" :label="role.name" align="center">
        <template #default="scope">
          <el-checkbox :model-value="scope.row.checkPermissionForRole(role.id)" @change="scope.row.setRole($event, role.id)"> </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column v-for="role in roles" :key="role.id" :label="role.name" align="center">
        <template #default="scope">
          <el-checkbox :model-value="scope.row.checkPermissionForRole(role.id)" @change="scope.row.setRole($event, role.id)"> </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column v-for="role in roles" :key="role.id" :label="role.name" align="center">
        <template #default="scope">
          <el-checkbox :model-value="scope.row.checkPermissionForRole(role.id)" @change="scope.row.setRole($event, role.id)"> </el-checkbox>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { RouteRecordNormalized, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import PathPermission from '@/classes/PathPermission';
import Role from '@/classes/Role';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Orders } from '@/interfaces/filters/Orders';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionRole from '@/interfaces/IPathPermissionRole';
import IRole from '@/interfaces/IRole';
import { RoleName } from '@/interfaces/RoleName';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AdminGallery',
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const paths = router.getRoutes();
    const mounted: Ref<boolean> = ref(false);
    const filterString: Ref<string> = ref('');

    const clientPermissions: Ref<IPathPermission[]> = computed(() => store.getters['auth/pathPermissions']);
    const roles: ComputedRef<IRole[]> = computed(() => store.getters['roles/items']);
    const selectRolesList: ComputedRef<IRole[]> = computed(() => roles.value.filter((role: IRole) => !filteredRoles.value.includes(role)));
    const filteredRoles: Ref<IRole[]> = ref([]);
    const chosenRole: Ref<IRole> = ref(new Role());
    const permissions: Ref<IPathPermission[]> = ref([]);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit('filter/setStoreModule', 'auth');
      store.commit('filter/setAction', 'getAllPathPermissionsAdmin');
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(
          schema.value.pathPermission.tableName,
          schema.value.pathPermission.resource,
          Orders.Asc,
          'По алфавиту',
          true
        )
      );
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 0;
      await store.dispatch('auth/getAllPathPermissionsAdmin', filterQuery.value);
      // await store.dispatch('auth/getAllPathPermissions');
      store.commit('admin/setHeaderParams', {
        title: 'Клиентские доступы',
        buttons: [{ text: 'Сохранить', action: savePaths }],
      });
      await store.dispatch('roles/getAll');
      filteredRoles.value = roles.value.filter((role: IRole) => role.name === RoleName.User);
      permissions.value = paths.map((path: RouteRecordNormalized) => {
        let permission = clientPermissions.value.find((p: IPathPermission) => p.resource === path.path);
        if (permission) {
          return permission;
        }
        permission = new PathPermission();
        permission.resource = path.path;
        return permission;
      });
      // await savePaths();
      // await store.dispatch('auth/getAllPathPermissionsAdmin', filterQuery.value);
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const savePaths = async () => {
      await store.dispatch('auth/savePathPermissions', permissions.value);
    };

    const setAll = (roleId: string): void => {
      const hasRole = permissions.value.some((p: IPathPermission) =>
        p.pathPermissionsRoles.some((r: IPathPermissionRole) => r.roleId === roleId)
      );
      if (hasRole) {
        return permissions.value.forEach((p: IPathPermission) => p.removeRole(roleId));
      }
      return permissions.value.forEach((p: IPathPermission) => p.addRole(roleId));
    };
    const setAllGuests = () => {
      const hasGuestAllow = permissions.value.some((p: IPathPermission) => p.guestAllow);
      permissions.value.forEach((p: IPathPermission) => (p.guestAllow = !hasGuestAllow));
    };
    const addRole = () => {
      filteredRoles.value.push(chosenRole.value);
      chosenRole.value = new Role();
    };
    const addAllRoles = () => {
      filteredRoles.value = roles.value;
      chosenRole.value = new Role();
    };
    return {
      setAllGuests,
      setAll,
      roles,
      mounted,
      permissions,
      savePaths,
      paths,
      filteredRoles,
      chosenRole,
      selectRolesList,
      addRole,
      addAllRoles,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  text-align: center;
}

$news-content-max-width: 400px;
$news-content-max-height: 165px;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  // height: 400px;
  text-align: center;
  align-content: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item) {
  transition: unset;
}

.card-header {
  text-align: start;
}

.table-container {
  overflow: scroll;
  height: 100%;
  width: auto;
}
thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
}

tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
}

thead th:first-child {
  left: 0;
  z-index: 2;
}
tr th:first-child {
  z-index: 1;
  text-align: start;
}

thead th,
tbody th {
  background: #f5f5f5;
  z-index: 1;
}

.el-checkbox {
  z-index: 0;
}
td,
th {
  padding: 0.5em;
  border: 1px solid #ebeef5;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr:hover {
  background-color: #f5f5f5;
}
.table-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .el-button {
    width: auto;
  }
}
th {
  vertical-align: baseline;
}
</style>
