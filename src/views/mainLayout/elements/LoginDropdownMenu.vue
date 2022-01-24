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
        <div v-if="isLaptopWindowWidth">
          <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile/edit')">Редактировать профиль</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile/children')">Мои дети</el-dropdown-item>
          <el-dropdown-item icon="el-icon-question" @click="$router.push('/profile/questions')">Ответы на вопросы</el-dropdown-item>
          <el-dropdown-item icon="el-icon-first-aid-kit">Донорство крови</el-dropdown-item>
        </div>
        <el-dropdown-item icon="el-icon-setting" @click="$router.push('/admin/news')">Кабинет администратора</el-dropdown-item>
        <el-dropdown-item @click="logout"><LogoutOutlined />Выйти</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { authGuard } from '@/router';

export default defineComponent({
  name: 'LoginDropdownMenu',
  components: { LoginOutlined, LogoutOutlined, UserAddOutlined },
  props: { showButtonName: { type: Boolean, default: false } },

  async setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const login = () => store.commit('auth/openModal', true);
    const register = () => store.commit('auth/openModal');

    const logout = async () => {
      await store.dispatch('auth/logout');
      const curRoute = route.name;
      const rr = router.options.routes.find((r) => r.name === curRoute);
      if (rr && rr.meta && rr.meta.protected) {
        authGuard();
      }
    };

    const isAuth = computed(() => store.getters['auth/isAuth']);
    const isLaptopWindowWidth: Ref<boolean> = ref(window.matchMedia('(max-width: 1024px)').matches);

    onMounted(() => {
      window.addEventListener('resize', () => {
        isLaptopWindowWidth.value = window.matchMedia('(max-width: 1024px)').matches;
      });
    });

    return {
      logout,
      isAuth,
      login,
      register,
      isLaptopWindowWidth,
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
  background-color: #f0f2f7;
  border: none;
}
.menu-item:hover {
  background-color: #ffffff;
}
.el-button:hover {
  color: inherit;
}
:deep(.el-button) {
  border: none;
  background-color: #e4e5e7;

  i {
    font-size: 24px;
  }
}
</style>
