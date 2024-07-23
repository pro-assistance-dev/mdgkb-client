<template>
  <div class="container">
    <PButton skin="profile" text="Поиск" width="260px" margin="10px 0 0 0" @click.stop="$router.push('/profile')" />
    <PButton skin="profile" text="Мой профиль" width="260px" margin="10px 0 0 0" @click.stop="$router.push('/profile')" />
    <PButton skin="profile" text="Заказ еды" width="260px" margin="10px 0 0 0" @click.stop="$router.push('/profile/daily-menu-orders')" />
    <PButton skin="profile" text="Настройки" width="260px" margin="10px 0 0 0" @click.stop="$router.push('/profile/settings')" />
    <PButton
      v-if="UserService.isAdmin()"
      skin="profile"
      text="Кабинет администратора"
      width="260px"
      margin="10px 0 0 0"
      @click="$router.push(`/admin/${curUser.role.startPage}`)"
    />
    <PButton skin="profile" text="Выйти" width="260px" margin="10px 0 0 0" @click="logout" />
  </div>
</template>

<script lang="ts">
import UserService from '@/services/User';

export default defineComponent({
  name: 'ChoiceListPage',
  async setup() {
    const logout = async () => {
      PHelp.Auth.Logout();
      Router.To('/');
    };

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
