<template>
  <template v-if="!auth.isAuth">
    <el-button @click="login" v-if="showButtonName" icon="el-icon-user" round>Войти</el-button>
  </template>
  <el-dropdown v-else>
    <el-button v-if="showButtonName" icon="el-icon-user" round>
      Профиль
      <!-- TODO: переделать на серверный запрос  -->
      <!-- <el-badge v-if="user.formValues.length && user.formValues.some((el) => !el.viewedByUser)" is-dot type="danger"> </el-badge> -->
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="el-icon-user" @click="Router.To('/profile')">
          Профиль
          <!-- TODO: переделать на серверный запрос  -->
          <!-- <el-badge v-if="user.formValues.length && user.formValues.some((el) => !el.viewedByUser)" is-dot type="danger"> </el-badge> -->
        </el-dropdown-item>
        <el-dropdown-item
          v-if="auth.user.get().role.name === 'ADMIN'"
          icon="el-icon-setting"
          @click="Router.To(`/admin/${auth.user.get().role.startPage}`)"
          >Кабинет администратора</el-dropdown-item
        >
        <el-dropdown-item @click="logout"> <LogoutOutlined />Выйти </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';

import User from '@/classes/User';
import { authGuard } from '@/router';
import Provider from '@/services/Provider/Provider';

defineProps({ showButtonName: { type: Boolean, default: false } });
const authModal = Store.Getters('auth/modal');
const auth = Store.Getters('auth/auth');

const login = () => {
  authModal.value.open(true);
};

const register = () => Provider.store.commit('auth/openModal', 'register');
const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
const user: User = UsersStore.Item();
const curUser: ComputedRef<User> = computed(() => Provider.store.getters['auth/user']);
const authOnly: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/authOnly']);

const loadUser = async () => {
  await UsersStore.Get(userId.value);
};

const logout = async () => {
  auth.value.logout();
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
const isLaptopWindowWidth: Ref<boolean> = ref(window.matchMedia('(max-width: 560px)').matches);

onBeforeMount(async () => {
  await loadUser();
});

onMounted(() => {
  window.addEventListener('resize', () => {
    isLaptopWindowWidth.value = window.matchMedia('(max-width: 560px)').matches;
  });
});

const toProfile = async (): Promise<void> => {
  if (isLaptopWindowWidth.value) {
    await Router.To('/profile');
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
