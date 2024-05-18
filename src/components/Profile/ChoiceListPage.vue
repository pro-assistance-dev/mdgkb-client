<template>
  <div class="container">
    <PButton type="admin" text="Поиск" width="260px" margin="10px 0 0 0"
      @click.stop="$router.push('/profile')" />
    <PButton type="admin" text="Мой профиль" width="260px" margin="10px 0 0 0"
      @click.stop="$router.push('/profile')" />
    <PButton type="admin" text="Заказ еды" width="260px" margin="10px 0 0 0"
      @click.stop="$router.push('/profile/daily-menu-orders')" />
    <PButton type="admin" text="Настройки" width="260px" margin="10px 0 0 0"
      @click.stop="$router.push('/profile/settings')" />
    <PButton type="admin" v-if="UserService.isAdmin()" text="Кабинет администратора" width="260px"
    margin="10px 0 0 0" @click="$router.push(`/admin/${curUser.role.startPage}`)" />
    <PButton type="admin" text="Выйти" width="260px" margin="10px 0 0 0"
      @click="logout" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';

import { authGuard } from '@/router';
import Provider from '@/services/Provider/Provider';
import UserService from '@/services/User';

export default defineComponent({
  name: 'ChoiceListPage',
  async setup() {
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
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

    onBeforeMount(async () => {
      await loadUser();
    });

    return {
      UserService,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
