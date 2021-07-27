<template>
  <el-dropdown v-if="!isAuth">
    <el-button v-if="showButtonName" icon="el-icon-user" round>Войти</el-button>
    <el-button v-else class="menu-item" icon="el-icon-user"></el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="login"><LoginOutlined />Войти</el-dropdown-item>
        <el-dropdown-item @click="register"><UserAddOutlined />Зарегистрироваться</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dropdown v-else>
    <el-button v-if="showButtonName" icon="el-icon-user" round>Профиль</el-button>
    <el-button v-else class="menu-item" icon="el-icon-user"></el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile')">Профиль</el-dropdown-item>
        <el-dropdown-item icon="el-icon-setting" @click="$router.push('/admin/news')">Кабинет администратора</el-dropdown-item>
        <el-dropdown-item @click="logout"><LogoutOutlined />Выйти</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';

import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'LoginDropdownMenu',
  components: { LoginOutlined, LogoutOutlined, UserAddOutlined },
  props: { showButtonName: { type: String } },

  async setup() {
    const store = useStore();
    const login = () => store.commit('auth/openModal', true);
    const register = () => store.commit('auth/openModal');
    const logout = async () => {
      await store.dispatch('auth/logout');
      window.location.reload();
    };
    const isAuth = computed(() => store.getters['auth/isAuth']);

    return {
      logout,
      isAuth,
      login,
      register,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.anticon {
  margin-right: 5px;
}
.menu-item {
  height: 56px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-item:hover {
  background-color: #e4e5e7;
}
.el-button:hover {
  color: inherit;
}
:deep(.el-button) {
  border: none;
  background-color: whitesmoke;

  i {
    font-size: 24px;
  }
}
</style>
