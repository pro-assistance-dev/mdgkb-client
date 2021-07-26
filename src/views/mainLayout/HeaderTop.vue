<template>
  <div class="header-top">
    <div class="container">
      <el-row>
        <el-col :offset="11" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <div class="flex">
            <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="nav('/news')" />
          </div>
        </el-col>
        <el-col :xs="0" :sm="0" :md="0" :xl="{ span: 1, offset: 9 }" :lg="{ span: 1, offset: 9 }">
          <el-dropdown v-if="!isAuth">
            <el-button icon="el-icon-user" round>Войти</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="login"><LoginOutlined />Войти</el-dropdown-item>
                <el-dropdown-item @click="register"><UserAddOutlined />Зарегистрироваться</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown v-else>
            <el-button icon="el-icon-user" round>Профиль</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-user" @click="$router.push('/profile')">Профиль</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting" @click="$router.push('/admin/news')">Кабинет администратора</el-dropdown-item>
                <el-dropdown-item @click="logout"><LogoutOutlined />Выйти</el-dropdown-item>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'HeaderTop',
  components: { LoginOutlined, LogoutOutlined, UserAddOutlined },

  async setup() {
    const router = useRouter();

    const store = useStore();
    const login = () => store.commit('auth/openModal', true);
    const register = () => store.commit('auth/openModal');
    const logout = async () => await store.dispatch('auth/logout');
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const nav = async (to: string) => await router.push(to);

    return {
      nav,
      logout,
      isAuth,
      login,
      register,
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
.anticon {
  margin-right: 5px;
}
</style>
