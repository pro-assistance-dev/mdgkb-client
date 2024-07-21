<template>
  <template v-if="!PHelp.Auth.IsAuth()">
    <el-button icon="el-icon-user" round @click="login">Войти</el-button>
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
          v-if="PHelp.Auth.GetUser().role.name === 'ADMIN'"
          icon="el-icon-setting"
          @click="Router.To(`/admin/${PHelp.Auth.GetUser().role.startPage}`)"
          >Кабинет администратора</el-dropdown-item
        >
        <el-dropdown-item @click="logout"> <LogoutOutlined />Выйти </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { LogoutOutlined } from '@ant-design/icons-vue';

import { authGuard } from '@/router';
import Provider from '@/services/Provider/Provider';

defineProps({ showButtonName: { type: Boolean, default: false } });

const login = () => {
  PHelp.AuthModal.Open(true);
};

const loadUser = async () => {
  await UsersStore.Get(PHelp.Auth.GetUser().id as string);
};

const logout = async () => {
  PHelp.Auth.Logout();
  const curRoute = Provider.route().name;
  const rr = Provider.router.options.routes.find((r) => r.name === curRoute);
  if (rr && rr.meta && rr.meta.protected) {
    authGuard();
  }
};

const isLaptopWindowWidth: Ref<boolean> = ref(window.matchMedia('(max-width: 560px)').matches);

onBeforeMount(async () => {
  await loadUser();
});

onMounted(() => {
  window.addEventListener('resize', () => {
    isLaptopWindowWidth.value = window.matchMedia('(max-width: 560px)').matches;
  });
});
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
