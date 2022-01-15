<template>
  <!-- Spacer, which helps, when header becomes fixed -->
  <div v-if="scrollOffset >= 66" class="spacer">&nbsp;</div>
  <div :class="{ fixed: scrollOffset >= 66 }">
    <div class="header-menu">
      <div class="container" style="height: 100%">
        <div class="menu-container">
          <div class="menu-container-left">
            <el-button icon="el-icon-s-unfold" class="menu-item open-menu-button" @click="changeDrawerStatus"></el-button>
          </div>
          <div class="menu-container-center">
            <NavMenu />
          </div>
          <div class="menu-container-right">
            <el-button v-if="scrollOffset >= 66 || tabletWindow" icon="el-icon-search" @click="showSearchDrawer"></el-button>
            <div v-if="scrollOffset >= 66">
              <LoginDropdownMenu />
            </div>
            <el-popover
              placement="bottom-start"
              width="auto"
              trigger="hover"
              content="this is content, this is content, this is content"
              style="border-radius: 20px"
            >
              <template #reference>
                <div>
                  <el-button v-if="scrollOffset < 66" class="menu-item" @click="$router.push('/map')">
                    <el-space>
                      <div class="phones">
                        +7 (495) 959-88-00<br />
                        +7 (495) 959-88-03
                      </div>
                      <i class="el-icon-info icon"></i>
                    </el-space>
                  </el-button>
                  <el-space v-else>
                    <el-button class="menu-item" icon="el-icon-info" @click="$router.push('/map')"></el-button>
                  </el-space>
                </div>
              </template>
              <div id="helppop">
                <div class="phone">
                  +7 (495) 959-88-00<br />
                  +7 (495) 959-88-03
                </div>
                <div class="call-center">
                  <small> Call-центр принимает звонки круглосуточно и без выходных. По России звонок бесплатный. </small>
                </div>
                <div class="address">119049 г. Москва, 4-й Добрынинский переулок, дом 1/9</div>
                <div class="address2">
                  <small>Вход на территорию больницы с 1-ого Добрынинского переулка.</small>
                </div>
                <div class="icons">
                  <a href="#" class="social-icon">
                    <img src="../../assets/img/social/facebook.png" />
                  </a>
                  <a href="#" class="social-icon">
                    <img src="../../assets/img/social/instagram.png" />
                  </a>
                  <a href="#" class="social-icon">
                    <img src="../../assets/img/social/youtube.png" />
                  </a>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
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

export default defineComponent({
  name: 'HeaderBottom',
  components: {
    NavMenu,
    LoginDropdownMenu,
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
.menu-item {
  height: 56px;
}
.menu-container-left {
  display: flex;
}
.menu-container {
  display: flex;
  justify-content: space-evenly;
  height: 56px;

  &-left {
    margin-right: auto;
  }

  &-center {
    margin-left: auto;
  }

  &-right {
    font-weight: bold;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
  }
}

.phones {
  font-weight: bold;
}

#helppop {
  // padding: 22px;
  // background: #fcfcfc;
  // border-radius: 10px;
  // box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);

  .phone {
    margin-top: 6px;
  }

  .call-center {
    margin-top: 12px;
  }

  .address {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .address {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .icons {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .social-icon {
    margin-top: 12px;
    margin-right: 12px;
  }

  #helppop .social-icon img {
    width: 24px;
    height: 24px;
    max-height: 24px;
  }
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.spacer {
  width: 100%;
  height: 56px;
}

.el-row {
  height: 56px;
}

.icon {
  font-size: 24px;
}

:deep(.el-button) {
  border: none;
  background-color: #f5f6f8;

  i {
    font-size: 24px;
  }
}

.el-button:hover {
  color: inherit;
}

.drawer-block {
  h4 {
    font-weight: normal;
    text-transform: uppercase;
    font-size: 14px;
  }

  .el-menu-item div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

:deep(.el-drawer) {
  .el-space {
    padding: 0 0 0 20px;
  }

  .el-space__item {
    width: 100%;
  }
}

.el-menu {
  border-right: none;
}

:deep(.el-sub-menu__title) {
  height: 56px !important;
}
.anticon {
  margin-right: 5px;
}
.open-menu-button,
.drawer {
  display: none;
}
.drawer {
  display: none;
}
@media screen and (max-width: 1025px) {
  .menu-container-center {
    width: 320px;
    display: none;
  }
  .open-menu-button,
  .drawer {
    display: unset;
  }
}
:deep(.el-drawer__body) {
  padding: 0;
  background-color: #f5f6f8;
}

.header-menu {
  background: #f5f6f8;
  height: 59px;
}
</style>
