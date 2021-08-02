<template>
  <div style="min-height: 100vh">
    <AdminHeaderTop />
    <div class="admin-main-container">
      <AdminSideMenu class="side-menu hidden-sm-and-down" />
      <div class="admin-container">
        <AdminHeaderBottom />
        <el-main style="height: 100%">
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
import { ref, defineComponent, computed } from 'vue';
import AdminHeaderTop from '@/views/adminLayout/AdminHeaderTop.vue';
import AdminHeaderBottom from '@/views/adminLayout/AdminHeaderBottom.vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';
import AdminMenuDrawer from '@/views/adminLayout/AdminMenuDrawer.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminHeaderTop,
    AdminHeaderBottom,
    AdminSideMenu,
    AdminMenuDrawer,
  },

  setup() {},
});
</script>

<style lang="scss" scoped>
.admin-main-container {
  display: flex;
  min-height: calc(100vh - 61px);
}

.admin-container {
  width: 100%;
  height: 100%;
}

// .side-menu {
//   position: fixed;
//   height: 100%;
// }
</style>
