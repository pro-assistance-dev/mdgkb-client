<template>
  <el-card>
    <h4>Меню</h4>
    <el-menu default-active="1">
      <el-menu-item index="1" @click="$router.push('/profile')">
        <i class="el-icon-warning-outline"></i>
        <span>Информация</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/profile/edit')">
        <i class="el-icon-user"></i>
        <span>Мой профиль</span>
      </el-menu-item>
    </el-menu>
    <h4>Сервисы</h4>
    <el-menu>
      <el-menu-item index="1">
        <i class="el-icon-first-aid-kit"></i>
        <span>Донорство крови</span>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ProfileSideMenu',
});
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

h4 {
  font-weight: normal;
  text-transform: uppercase;
  font-size: 14px;
  margin: 10px 0 5px 15px;
}
</style>
