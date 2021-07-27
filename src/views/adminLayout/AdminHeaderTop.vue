<template>
  <div class="admin-header fixed">
    <div class="left-panel">
      <!-- To open drawer -->
      <el-button icon="el-icon-s-unfold" @click="openDrawer" class="hidden-md-and-up"></el-button>
      <!-- To open collapse side menu -->
      <el-button icon="el-icon-s-unfold" @click="collapseSideMenu" class="hidden-sm-and-down"></el-button>
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
          <el-menu-item @click="$router.push('/profile')" index="2-1">
            <div style="margin: auto 0"><UserOutlined /><span> Профиль</span></div>
          </el-menu-item>
          <el-menu-item @click="$router.push('/news')" index="2-1">
            <div style="margin: auto 0"><GlobalOutlined /><span> На сайт</span></div>
          </el-menu-item>
          <el-menu-item @click="logout" index="2-2">
            <div style="margin: auto 0"><LogoutOutlined /><span> Выйти</span></div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
  <div class="spacer"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { LogoutOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AdminHeaderTop',
  components: { LogoutOutlined, UserOutlined, GlobalOutlined },

  setup() {
    const store = useStore();
    const router = useRouter();
    const collapseSideMenu = () => store.commit('admin/collapseSideMenu');
    const openDrawer = () => store.commit('admin/openDrawer');

    const logout = async () => {
      await store.dispatch('auth/logout');
      await router.push('/news');
    };

    return { collapseSideMenu, openDrawer, logout };
  },
});
</script>

<style lang="scss" scoped>
$header-background-color: whitesmoke;
$header-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
$header-height: 61px;
$button-background-color: #fff;

.admin-header {
  width: 100%;
  background-color: $header-background-color;
  justify-content: space-between;
  box-shadow: $header-shadow;

  .el-button {
    border: none;
    background-color: $header-background-color;
    margin: 0 !important;
    height: $header-height;
  }

  .el-button:hover,
  .el-button:active,
  .el-button:focus {
    background-color: $button-background-color;
    color: inherit;
  }

  :deep(i) {
    font-size: 24px;
  }

  h3 {
    margin: 0 10px;
    font-weight: normal;
    font-size: 20px;
  }

  :deep(.el-menu-item),
  :deep(.el-menu),
  :deep(.el-submenu__title) {
    background-color: $header-background-color;
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

.anticon {
  margin-right: 5px;
}
</style>
