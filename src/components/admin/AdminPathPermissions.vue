<template>
  <button @click="savePaths">Сохранить на сервере</button>
  <div v-if="mounted">
    <table class="table-list">
      <thead>
        <th>Клиентский путь</th>
        <th>
          Гостевой доступ
          <button @click="setAllGuests()">Выделить всё</button>
        </th>

        <th v-for="role in roles" :key="role.id">
          <h4>{{ role.name }}</h4>
          <button @click="setAll(role.id)">Выделить всё</button>
        </th>
      </thead>
      <tbody>
        <tr v-for="permission in permissions" :key="permission.resource">
          <td>
            {{ permission.resource }}
          </td>
          <td>
            <el-checkbox v-model="permission.guestAllow"> </el-checkbox>
          </td>
          <td v-for="role in roles" :key="role.id">
            <el-checkbox :model-value="permission.checkPermissionForRole(role.id)" @change="permission.setRole($event, role.id)">
            </el-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { RouteRecordNormalized, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PathPermission from '@/classes/PathPermission';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionRole from '@/interfaces/IPathPermissionRole';
import IRole from '@/interfaces/IRole';

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
    const roles: Ref<IRole[]> = computed(() => store.getters['roles/items']);
    const permissions: Ref<IPathPermission[]> = ref([]);

    onBeforeMount(async () => {
      await store.dispatch('auth/getAllPathPermissions');
      await store.dispatch('roles/getAll');
      permissions.value = paths.map((path: RouteRecordNormalized) => {
        let permission = clientPermissions.value.find((p: IPathPermission) => p.resource === path.path);
        if (permission) {
          return permission;
        }
        permission = new PathPermission();
        permission.resource = path.path;
        return permission;
      });
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
    return {
      setAllGuests,
      setAll,
      roles,
      mounted,
      permissions,
      savePaths,
      paths,
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
</style>
