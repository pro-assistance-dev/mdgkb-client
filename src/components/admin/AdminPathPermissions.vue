<template>
  <div v-if="mounted" class="flex-column" style="height: 100%">
    <div class="card-item filters">
      <div class="filters-block">
        <span>Найти:</span>
        <RemoteSearch
          :key-value="schema.pathPermission.key"
          :model-value="searchString"
          :show-suggestions="false"
          :must-be-translated="false"
          @input="filterList"
        />
      </div>
      <div class="filters-block">
        <span>Сортировать:</span>
        <SortList :models="createSortModels()" @load="loadPaths" />
      </div>
    </div>
    <div style="height: 100%; overflow: hidden" class="card-item">
      <div class="table-container">
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
            <tr v-for="permission in filteredPathPermissions" :key="permission.resource">
              <th style="min-width: 200px">
                {{ permission.resource }}
              </th>
              <td style="text-align: center">
                <el-checkbox v-model="permission.guestAllow" size="mini"> </el-checkbox>
              </td>
              <td v-for="role in filteredRoles" :key="role.id" style="text-align: center">
                <el-checkbox
                  size="mini"
                  :model-value="permission.checkPermissionForRole(role.id)"
                  @change="permission.setRole($event, role.id)"
                >
                </el-checkbox>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';
import { RouteRecordNormalized } from 'vue-router';

import PathPermission from '@/classes/PathPermission';
import Role from '@/classes/Role';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionRole from '@/interfaces/IPathPermissionRole';
import IRole from '@/interfaces/IRole';
import ISearchObject from '@/interfaces/ISearchObject';
import { RoleName } from '@/interfaces/RoleName';
import ISchema from '@/interfaces/schema/ISchema';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import PathPermissionsSortsLib from '@/services/Provider/libs/sorts/PathPermissionsSortsLib';

export default defineComponent({
  name: 'AdminGallery',
  components: {
    SortList,
    RemoteSearch,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },

  setup(props) {
    const paths = Provider.router.getRoutes();
    const filterString: Ref<string> = ref('');
    const searchString: Ref<string> = ref('');
    const sortString: Ref<string> = ref('');

    const checkPermissionForRole = computed((roleId: string, obj: IPathPermission) => obj.checkPermissionForRole(roleId));

    const clientPermissions: Ref<IPathPermission[]> = computed(() => Provider.store.getters['auth/pathPermissions']);
    const filteredPathPermissions: Ref<IPathPermission[]> = computed(() => {
      if (!searchFilterPathPermissions.value.length) {
        return clientPermissions.value;
      }
      return clientPermissions.value.filter((pathPermission: IPathPermission) => {
        if (!pathPermission.id) return;
        return searchFilterPathPermissions.value.includes(pathPermission.id);
      });
    });
    const searchFilterPathPermissions: Ref<string[]> = ref([]);
    const roles: ComputedRef<IRole[]> = computed(() => Provider.store.getters['roles/items']);
    const selectRolesList: ComputedRef<IRole[]> = computed(() => roles.value.filter((role: IRole) => !filteredRoles.value.includes(role)));
    const filteredRoles: Ref<IRole[]> = ref([]);
    const chosenRole: Ref<IRole> = ref(new Role());
    const permissions: Ref<IPathPermission[]> = ref([]);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => Provider.store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => Provider.store.getters['meta/schema']);

    const loadPaths = async () => {
      await Provider.store.dispatch('auth/getAllPathPermissionsAdmin', filterQuery.value);
    };

    const load = async () => {
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Клиентские доступы',
        buttons: [{ text: 'Сохранить', action: savePaths }],
      });
      Provider.store.commit('filter/setStoreModule', 'auth');
      Provider.store.commit('filter/setAction', 'getAllPathPermissionsAdmin');
      Provider.setSortModels(PathPermissionsSortsLib.byResource(Orders.Asc));

      // TODO: проверить лимит по-умолчанию при отсутствии пагинации
      // ===========================================
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 1000;
      // ===========================================

      await Provider.store.dispatch('auth/getAllPathPermissionsAdmin', filterQuery.value);
      // await Provider.store.dispatch('auth/getAllPathPermissions');
      await Provider.store.dispatch('roles/getAll');
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
      await Provider.store.dispatch('auth/savePathPermissions', permissions.value);
      await Provider.store.dispatch('auth/getAllPathPermissionsAdmin', filterQuery.value);
    };

    Hooks.onBeforeMount(load);

    const savePaths = async () => {
      try {
        await Provider.store.dispatch('auth/savePathPermissions', clientPermissions.value);
      } catch {
        return;
      }
      ElMessage({
        message: 'Сохранено',
        type: 'success',
      });
    };

    const setAll = (roleId: string): void => {
      const hasRole = permissions.value.some((p: IPathPermission) =>
        p.pathPermissionsRoles.some((r: IPathPermissionRole) => r.roleId === roleId)
      );
      if (hasRole) {
        permissions.value.forEach((p: IPathPermission) => p.removeRole(roleId));
        filteredPathPermissions.value.forEach((p: IPathPermission) => p.removeRole(roleId));
        return;
      }
      permissions.value.forEach((p: IPathPermission) => p.addRole(roleId));
      filteredPathPermissions.value.forEach((p: IPathPermission) => p.addRole(roleId));
    };

    const setAllGuests = () => {
      const hasGuestAllow = permissions.value.some((p: IPathPermission) => p.guestAllow);
      permissions.value.forEach((p: IPathPermission) => (p.guestAllow = !hasGuestAllow));
      filteredPathPermissions.value.forEach((p: IPathPermission) => (p.guestAllow = !hasGuestAllow));
    };

    const addRole = () => {
      filteredRoles.value.push(chosenRole.value);
      chosenRole.value = new Role();
    };
    const addAllRoles = () => {
      filteredRoles.value = roles.value;
      chosenRole.value = new Role();
    };
    const filterList = (search: ISearchObject[]) => {
      searchFilterPathPermissions.value = search.map((el) => el.id);
    };
    const createSortModels = (): ISortModel[] => {
      return [PathPermissionsSortsLib.byResource(Orders.Asc), PathPermissionsSortsLib.byResource(Orders.Desc)];
    };

    return {
      checkPermissionForRole,
      setAllGuests,
      setAll,
      roles,
      mounted: Provider.mounted,
      permissions,
      savePaths,
      paths,
      filteredRoles,
      chosenRole,
      selectRolesList,
      addRole,
      addAllRoles,
      schema,
      filterList,
      searchString,
      filteredPathPermissions,
      createSortModels,
      loadPaths,
      sortString,
    };
  },
});
</script>

<style lang="scss" scoped>
// table
.table-container {
  overflow: auto;
  width: auto;
  height: inherit;
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
tr th {
  // font-weight: normal;
  vertical-align: middle;
}

thead th:first-child {
  left: 0;
  z-index: 2;
}
tr th:first-child {
  z-index: 1;
  text-align: start;
  font-weight: normal;
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
  padding: 5px;
  h4 {
    margin: 0;
  }
  .el-button {
    width: auto;
  }
}
th {
  vertical-align: baseline;
}
// page container
.flex-column {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
// scroll
::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(245, 245, 245, 0.47);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 5px 0;
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(85, 85, 85, 0.25);
}
// filters
.filters {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &-block {
    margin-right: 10px;
    display: flex;
    align-items: center;
    span {
      margin: 0 10px;
    }
  }
}
</style>
