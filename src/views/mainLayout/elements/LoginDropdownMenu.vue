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
    <el-button v-if="showButtonName" icon="el-icon-user" round>
      Профиль
      <el-badge v-if="user.formValues.length && user.formValues.some((el) => !el.viewedByUser)" is-dot type="danger"> </el-badge>
    </el-button>
    <el-button v-else class="menu-item" icon="el-icon-user"></el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile')">
          Профиль
          <el-badge v-if="user.formValues.length && user.formValues.some((el) => !el.viewedByUser)" is-dot type="danger"> </el-badge>
        </el-dropdown-item>
        <div v-if="isLaptopWindowWidth">
          <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile/edit')">Редактировать профиль</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile/children')">Мои дети</el-dropdown-item>
          <el-dropdown-item icon="el-icon-question" @click="$router.push('/profile/questions')">Ответы на вопросы</el-dropdown-item>
          <el-dropdown-item icon="el-icon-first-aid-kit">Донорство крови</el-dropdown-item>
        </div>
        <el-dropdown-item v-if="UserService.isAdmin()" icon="el-icon-setting" @click="$router.push(`/admin/${curUser.role.startPage}`)"
          >Кабинет администратора</el-dropdown-item
        >
        <el-dropdown-item @click="logout"><LogoutOutlined />Выйти</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';
import { computed, ComputedRef, defineComponent, onBeforeMount, onMounted, Ref, ref } from 'vue';

import IUser from '@/interfaces/IUser';
import { authGuard } from '@/router';
import Provider from '@/services/Provider/Provider';
import UserService from '@/services/User';
export default defineComponent({
  name: 'LoginDropdownMenu',
  components: { LoginOutlined, LogoutOutlined, UserAddOutlined },
  props: { showButtonName: { type: Boolean, default: false } },

  async setup() {
    const login = () => Provider.store.commit('auth/openModal', 'login');
    const register = () => Provider.store.commit('auth/openModal', 'register');
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => Provider.store.getters['users/item']);
    const curUser: ComputedRef<IUser> = computed(() => Provider.store.getters['auth/user']);
    const authOnly: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/authOnly']);

    const loadUser = async () => {
      await Provider.store.dispatch('users/get', userId.value);
    };

    const logout = async () => {
      await Provider.store.dispatch('auth/logout');
      const curRoute = Provider.route().name;
      const rr = Provider.router.options.routes.find((r) => r.name === curRoute);
      if (rr && rr.meta && rr.meta.protected) {
        authGuard();
      }
      if (authOnly.value) {
        Provider.store.commit('auth/showWarning', true);
        Provider.store.commit('auth/openModal', 'login');
      }
    };

    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);
    const isLaptopWindowWidth: Ref<boolean> = ref(window.matchMedia('(max-width: 1024px)').matches);

    onBeforeMount(async () => {
      await loadUser();
    });

    onMounted(() => {
      window.addEventListener('resize', () => {
        isLaptopWindowWidth.value = window.matchMedia('(max-width: 1024px)').matches;
      });
    });

    return {
      UserService,
      logout,
      isAuth,
      login,
      register,
      isLaptopWindowWidth,
      user,
      curUser,
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
  padding: 23px;
  height: 58px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f7;
  border: none;
  border-radius: 0px;
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
.el-badge {
  position: absolute;
  top: 5px;
}
</style>
