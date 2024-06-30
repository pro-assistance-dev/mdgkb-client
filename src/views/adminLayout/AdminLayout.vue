<template>
  <div style="min-height: 100vh">
    <KeepAlive :include="[]" :max="0">
      <div>
        <AdminHeaderTop />
        <div class="admin-main-container">
          <AdminSideMenu class="side-menu hidden-sm-and-down" />
          <div class="admin-container">
            <AdminHeaderBottom style="position: sticky; z-index: 2" />
            <div v-if="$route.meta.adminLayout === AdminLayout.TableList" style="height: inherit">
              <slot />
            </div>
            <el-main v-else>
              <template #default>
                <slot />
              </template>
              <template #fallback>
                <div>Loading...</div>
              </template>
            </el-main>
          </div>
        </div>
        <AdminMenuDrawer />
      </div>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import { AdminLayout } from '@/services/interfaces/AdminLayout';
import AdminHeaderBottom from '@/views/adminLayout/AdminHeaderBottom.vue';
import AdminHeaderTop from '@/views/adminLayout/AdminHeaderTop.vue';
import AdminMenuDrawer from '@/views/adminLayout/AdminMenuDrawer.vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminHeaderTop,
    AdminHeaderBottom,
    AdminSideMenu,
    AdminMenuDrawer,
  },
  setup() {
    const isDrawerOpen: ComputedRef<boolean> = Store.Getters('admin/isDrawerOpen');
    const closeDrawer = () => Store.Commit('admin/closeDrawer');

    return { isDrawerOpen, closeDrawer, AdminLayout };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.admin-main-container {
  height: calc(100vh - 61px);
}
.admin-container {
  height: calc(100vh - 121px);
  width: 100%;
}
.el-main {
  height: inherit;
  overflow: scroll;
}
</style>
