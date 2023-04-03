<template>
  <div class="container">
    <Button
      text="Поиск"
      color="#343D5C"
      width="260px"
      height="40px"
      font-size="18px"
      margin-top="10px"
      @click.stop="$router.push('/profile')"
    />
    <Button
      text="Мой профиль"
      color="#006BB4"
      width="260px"
      height="40px"
      font-size="18px"
      margin-top="10px"
      @click.stop="$router.push('/profile')"
    />
    <Button
      text="Заказ еды"
      color="#0AA249"
      width="260px"
      height="40px"
      font-size="18px"
      margin-top="10px"
      @click.stop="$router.push('/profile/daily-menu-orders')"
    />
    <Button
      text="Настройки"
      color="#F3911C"
      width="260px"
      height="40px"
      font-size="18px"
      margin-top="10px"
      @click.stop="$router.push('/profile/settings')"
    />
    <Button
      v-if="UserService.isAdmin()"
      color="#343D5C"
      text="Кабинет администратора"
      width="260px"
      height="40px"
      font-size="18px"
      margin-top="10px"
      @click="$router.push(`/admin/${curUser.role.startPage}`)"
    />
    <Button text="Выйти" color="#E62C21" width="260px" height="40px" font-size="18px" margin-top="10px" @click="logout" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Button from '@/components/Base/Button.vue';
import { authGuard } from '@/router';
import Provider from '@/services/Provider/Provider';
import UserService from '@/services/User';

export default defineComponent({
  name: 'ProfileInfoPage',
  components: { Button },
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

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
