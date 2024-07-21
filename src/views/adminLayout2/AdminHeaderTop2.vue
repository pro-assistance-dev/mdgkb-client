<template>
  <div class="admin-header fixed">
    <div class="left-panel"></div>
    <div class="right-panel">
      <AdminSearchMenu />
      <el-dropdown>
        <el-button>
          <div class="user-info">
            <div class="user-info-container">
              <!-- <span v-if="user.role.label">{{ user.role.label }}</span> -->
              <!-- <span v-else>{{ user.role.name }}</span> -->
            </div>
            <i class="el-icon-user"></i>
          </div>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout"> <LogoutOutlined />Выйти </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button icon="el-icon-s-home" @click="$router.push('/')"></el-button>
    </div>
  </div>
  <div class="spacer"></div>
</template>

<script lang="ts" setup>
import { LogoutOutlined } from '@ant-design/icons-vue';

import AdminSearchMenu from '@/components/admin/AdminSearchMenu.vue';

const logout = async () => {
  PHelp.Auth.Logout();
  await Router.To('/');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$header-background-color: whitesmoke;
$header-shadow:
  0 0 10px 2px rgb(0 0 0 / 20%),
  0 0px 10px rgb(0 0 0 / 24%);
$header-height: 61px;
$button-background-color: #fff;

.admin-header {
  width: 100%;
  background-color: $header-background-color;
  justify-content: space-between;
  box-shadow: $header-shadow;
  display: inline-block;
  z-index: 700;

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
  :deep(.el-sub-menu__title) {
    background-color: $header-background-color;
  }

  :deep(.el-sub-menu__icon-arrow) {
    font-size: unset;
  }
}

.admin-header,
.left-panel,
.right-panel {
  display: flex;
  align-items: center;
}

.left-panel {
  width: 60px;
  height: 30px;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  // width: 100%;
  z-index: 100;
}

.spacer {
  height: $header-height;
}

.anticon {
  margin-right: 5px;
}

.user-info {
  display: flex;
  align-items: center;

  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 10px;
  }
}
</style>
