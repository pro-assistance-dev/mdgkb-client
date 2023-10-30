<template>
  <div class="navbar">
    <div v-if="devTitle === 'dev'" class="app-title">Разработка</div>
    <div class="support-field"><Support /></div>
    <div class="container">
      <div class="menu">
        <div class="menu-left"><BurgerMobile /></div>

        <div class="left-block">
          <el-row class="mb-4" @click="$scroll('#header-top')">
            <el-button v-if="scrollOffset >= 66 || mobileWindow" class="menu-item" @click="$router.push('/')">
              <img alt="mdgkb-logo-mini" src="@/assets/img/mdgkb-logo-mini.webp" />
            </el-button>
          </el-row>
        </div>
        <div id="top" class="menu-center"><NavMenu /></div>
        <div class="menu-right">
          <PhoneInfo />

          <div class="support-block"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import BurgerMobile from '@/views/mainLayout/elements/BurgerMobile.vue';
import NavMenu from '@/views/mainLayout/elements/NavMenu.vue';
import PhoneInfo from '@/views/mainLayout/elements/PhoneInfo.vue';
import Support from '@/views/mainLayout/elements/Support.vue';

export default defineComponent({
  name: 'HeaderBottom',
  components: {
    NavMenu,
    BurgerMobile,
    PhoneInfo,
    Support,
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
    const devTitle = process.env.VUE_APP_MODE;

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
      devTitle,
    };
  },
});
</script>

<style scoped lang="scss">
.navbar {
  background: #f0f2f7;
  border-top: 1px solid #dfe4ee;
  box-shadow: 0 4px 4px (rgba($color: #000000, $alpha: 0.2));

  display: flex;
  top: 0px;
  z-index: 99;
  height: auto;
  position: sticky;
  margin-top: 0px;
}

.container {
  margin: 0 auto;
  padding: 0;
  height: auto;
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

.left-block {
  min-width: 204px;
}

.menu-left {
  display: none;
  align-items: center;
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

.app-title {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
  padding: 0 6px;
  background: #2754eb;
  color: #ffffff;
  border-radius: 2px;
}

.support-field {
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 101;
  width: 120px;
}

.support-block {
  width: 120px;
}

@media screen and (max-width: 1600px) {
  .support-block {
    width: 120px;
  }
  .menu-right {
    display: flex;
    justify-content: right;
  }
}

@media screen and (max-width: 1330px) {
  .menu-center {
    display: none;
  }

  .menu-left {
    display: flex;
  }

  .left-block {
    min-width: 0px;
  }

  .menu-right {
    display: flex;
    justify-content: right;
  }
}

@media screen and (max-width: 480px) {
  .app-title {
    display: none;
  }
  .support-block {
    display: none;
  }

  .support-field {
    display: none;
  }
}
</style>
