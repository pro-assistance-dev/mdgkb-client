<template>
    <div class="navbar">
      <div class="container">
        <div class="menu">
          <div class="menu-left"><BurgerMobile /></div>
          <div class="left-block"></div>
          <div class="left-block"></div>
          <div class="menu-center"><NavMenu /></div>
          <div class="menu-right"><PhoneInfo /></div>
        </div>  
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';
import NavMenu from '@/views/mainLayout/elements/NavMenu.vue';
import BurgerMobile from '@/views/mainLayout/elements/BurgerMobile.vue';
import PhoneInfo from '@/views/mainLayout/elements/PhoneInfo.vue';

export default defineComponent({
  name: 'HeaderBottom',
  components: {
    NavMenu,
    LoginDropdownMenu,
    BurgerMobile,
    PhoneInfo,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const scrollOffset = ref(0);
    const previousOffset = ref(0);
    const rememberedOffset = ref(0);
    const tabletWindow = ref(window.matchMedia('(max-width: 768px)').matches);
    const mobileWindow = ref(window.matchMedia('(max-width: 480px)').matches);

    const nav = async (to: string) => {
      await router.push(to);
    };

    const login = () => store.commit('auth/openModal', true);
    const register = () => store.commit('auth/openModal');
    const logout = async () => {
      const curRoute = route.name;
      await router.push(curRoute as string);
      await store.dispatch('auth/logout');
    };

    const handleScroll = () => {
      if (scrollOffset.value > previousOffset.value && rememberedOffset.value != 0) {
        rememberedOffset.value = 0;
      }
      previousOffset.value = scrollOffset.value;
      scrollOffset.value = window.scrollY;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', () => {
        tabletWindow.value = window.matchMedia('(max-width: 768px)').matches;
        mobileWindow.value = window.matchMedia('(max-width: 480px)').matches;
      });
    });
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    const showDrawer = ref(false);
    const changeDrawerStatus = (status?: boolean) => {
      if (status !== undefined) {
        showDrawer.value = status;
        return;
      }
      showDrawer.value = !showDrawer.value;
    };
    const showSearchDrawer = () => store.commit('search/toggleDrawer', true);

    return {
      scrollOffset,
      previousOffset,
      rememberedOffset,
      showDrawer,
      changeDrawerStatus,
      login,
      register,
      logout,
      nav,
      tabletWindow,
      mobileWindow,
      showSearchDrawer,
    };
  },
});
</script>

<style scoped lang="scss">

.navbar {
  background: #F0F2F7;
  border-top: 1px solid #dfe4ee;
  box-shadow: 0 4px 4px (rgba($color: #000000, $alpha: 0.2));

  display: flex;
  top: 0;
  z-index: 99;
  height: 58px;
  position: sticky;
}

.container {
  margin: 0 auto;
  padding: 0;
}

.icon-menu {
  width: 28px;
  height: 28px;
  stroke: #343e5c;
  transition: 0.25s;
  padding-right: 30px;
  padding-left: 15px;
}

.icon-menu:hover {
  stroke: #379fff;
}

.menu {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
  height: auto;
}

.menu-left {
  display:none;
  align-items: center;
}

@media screen and (max-width: 1025px) {
  .menu-center {
    display: none;
  }

  .menu-left {
    display: flex;
  }
}
</style>
