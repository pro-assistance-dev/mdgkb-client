<template>
  <div class="hidden-md-and-up">
    <el-drawer custom-class="admin-drawer" :size="'auto'" v-model="showDrawer" direction="ltr" :with-header="false">
      <AdminSideMenu :isDrawer="true" @changeDrawerStatus="changeDrawerStatus" />
    </el-drawer>
  </div>
  <div class="admin-header fixed">
    <div class="left-panel">
      <!-- To open drawer -->
      <el-button icon="el-icon-s-unfold" @click="changeDrawerStatus" class="hidden-md-and-up"></el-button>
      <!-- To open collapse side menu -->
      <el-button icon="el-icon-s-unfold" @click="collapse" class="hidden-sm-and-down"></el-button>
      <h3>Панель управления МДГКБ</h3>
    </div>
    <div class="right-panel">
      <el-menu mode="horizontal" default-active="0">
        <el-menu-item index="1" @click="$router.push('/')">
          <i class="el-icon-s-home"></i>
        </el-menu-item>
        <el-submenu index="2" popper-class="acc-popper">
          <template #title>
            <i class="el-icon-user"></i>
          </template>
          <el-menu-item index="2-1">Мой аккаунт</el-menu-item>
          <el-menu-item index="2-2">Выйти</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
  <div class="spacer"></div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminHeaderTop',
  components: {
    AdminSideMenu,
  },

  setup(prop, { emit }) {
    const showDrawer = ref(false);
    const collapse = () => {
      emit('collapse');
    };
    const changeDrawerStatus = () => {
      showDrawer.value = !showDrawer.value;
    };

    return { collapse, showDrawer, changeDrawerStatus };
  },
});
</script>

<style lang="scss" scoped>
$header-background: whitesmoke;
$header-height: 61px;

.admin-header {
  width: 100%;
  background-color: $header-background;
  justify-content: space-between;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);

  .el-button {
    border: none;
    background-color: $header-background;
    margin: 0 !important;
    height: $header-height;
  }

  .el-button:hover,
  .el-button:active,
  .el-button:focus {
    background-color: #fff;
    color: inherit;
  }

  :deep(i) {
    font-size: 24px;
  }

  h3 {
    margin: 0 10px;
    font-weight: normal;
  }

  :deep(.el-menu-item),
  :deep(.el-menu),
  :deep(.el-submenu__title) {
    background-color: $header-background;
  }
  :deep(.el-submenu__icon-arrow) {
    font-size: unset;
  }
}
.admin-header,
.left-panel,
.right-panel {
  display: flex;
  align-items: center;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.spacer {
  height: $header-height;
}

:deep(.admin-drawer) {
  background-color: $header-background;
}
</style>
