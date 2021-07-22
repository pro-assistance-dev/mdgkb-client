<template>
  <div class="header-top">
    <div class="container">
      <el-row>
        <el-col :offset="11" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <div class="flex">
            <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="$router.push('/')" />
          </div>
        </el-col>
        <el-col :xl="{ span: 1, offset: 9 }" :lg="{ span: 1, offset: 8 }">
          <el-dropdown v-if="!isAuth()">
            <el-button round>Войти</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-plus" @click="$router.push('/login')">Войти</el-dropdown-item>
                <el-dropdown-item icon="el-icon-plus" @click="$router.push('/register')">Зарегистрироваться</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown v-else>
            <el-button round>Профиль</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-plus" @click="$router.push('/profile')">Профиль</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus" @click="logout">Выйти</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HeaderTop',
  setup() {
    const store = useStore();
    const isAuth = (): boolean => {
      return !!localStorage.getItem('token');
    };

    const logout = async () => {
      await store.dispatch('auth/logout');
    };

    return {
      logout,
      isAuth,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-logo-img {
  transition: all 0.3s;
}

.header-logo-img:hover {
  cursor: pointer;
  opacity: 0.7;
}

.flex {
  display: flex;
  justify-content: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
