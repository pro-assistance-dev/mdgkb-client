<template>
  <div class="hidden-md-and-up drawer-container">
    <el-drawer v-model="isDrawerOpen" custom-class="admin-drawer" :size="'auto'" direction="ltr" :with-header="false" @closed="closeDrawer">
      <AdminSideMenu />
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

const isDrawerOpen = Store.Getters('admin/isDrawerOpen');
const closeDrawer = Store.Getters('admin/closeDrawer');
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$header-background-color: whitesmoke;

:deep(.admin-drawer) {
  background-color: $header-background-color;
}

.drawer-container {
  height: 100%;
}
:deep(.el-drawer__body) {
  overflow-y: scroll;
  padding: 0;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;
    height: 8px;
    background-color: rgba(245, 245, 245, 0.47);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
    margin: 5px 0;
  }

  &::-webkit-scrollbar-thumb {
    height: 20px;
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(85, 85, 85, 0.25);
  }
}
</style>
