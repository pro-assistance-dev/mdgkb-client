<template>
  <div style="min-height: 100vh">
    <AdminHeaderTop />
    <div class="admin-main-container">
      <AdminSideMenu class="side-menu hidden-sm-and-down" />
      <div class="admin-container">
        <AdminHeaderBottom />
        <el-main>
          <template #default>
            <slot />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </el-main>
      </div>
    </div>
  </div>
  <AdminMenuDrawer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
});
</script>

<style lang="scss" scoped>
.admin-main-container {
  height: calc(100vh - 61px);
}
.admin-container {
  height: calc(100vh - 121px);
  width: 100%;
}
.el-main {
  height: inherit;
}
</style>
