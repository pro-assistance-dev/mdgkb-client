<template>
  <div v-if="mounted" class="admin-side-menu">
    <el-menu :default-active="activePath" :collapse="isCollapseSideMenu" background-color="whitesmoke" unique-opened @select="closeDrawer">
      <template v-for="item in menus" :key="item.title">
        <el-sub-menu v-if="item?.children?.length" :index="item.title">
          <template #title>
            <div class="sub-menu-container">
              <el-badge v-if="item.children.some((i) => i.count && i.count > 0)" is-dot type="danger"> </el-badge>
              <i :class="item.icon"></i>
              <span class="row-menu-title">{{ item.title }}</span>
            </div>
          </template>

          <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to" @click="$router.push(children.to)">
            <div class="menu-item-container">
              {{ children.title }}
              <el-badge v-if="children.count && children.count > 0" :value="children.count" type="danger"></el-badge>
            </div>
          </el-menu-item>
        </el-sub-menu>
        <div v-else>
          <el-menu-item v-if="item.to !== '/'" :index="item.to" @click="$router.push(item.to)">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import IPathPermission from '@/interfaces/IPathPermission';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const route = useRoute();
    const activePath: Ref<string> = ref('');
    const applicationsCounts: Ref<IApplicationsCount[]> = computed(() => store.getters['meta/applicationsCounts']);
    const mounted = ref(false);
    const userPermissions: ComputedRef<IPathPermission[]> = computed(() => store.getters['auth/userPathPermissions']);
    const menus: ComputedRef<IAdminMenu[]> = computed<IAdminMenu[]>(() => store.getters['admin/menus']);

    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    onBeforeMount(async () => {
      await store.dispatch('auth/getUserPathPermissions');
      store.commit('admin/filterMenus', userPermissions.value);
      await store.dispatch('meta/getApplicationsCounts');
      store.commit('admin/setApplicationsCounts', applicationsCounts.value);
      await store.dispatch('admin/subscribeApplicationsCountsGet');
      activePath.value = route.path;
      mounted.value = true;
    });

    onBeforeUnmount(async () => {
      await store.dispatch('admin/unsubscribeApplicationsCountsGet');
    });

    return { menus, closeDrawer, isCollapseSideMenu, activePath, mounted, applicationsCounts };
  },
});
</script>

<style lang="scss" scoped>
$background-color: whitesmoke;

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

.admin-side-menu {
  min-height: inherit;
  height: inherit;
  float: left;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;
  overflow-y: scroll;
  overflow-x: hidden;

  :deep(.el-sub-menu__icon-arrow) {
    margin-left: 10px;
  }

  :deep(i) {
    font-size: 24px;
  }

  :deep(.el-sub-menu__icon-arrow) {
    font-size: unset;
  }
}
.el-menu,
.el-menu-item {
  border: none;
}
.row-menu-title {
  margin-right: 20px;
}
.sub-menu-container {
  position: relative;
  .el-badge {
    position: absolute;
    top: -10px;
    left: -10px;
  }
}
.menu-item-container {
  display: flex;
  align-items: center;
  .el-badge {
    margin-left: 5px;
  }
}
</style>
