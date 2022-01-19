<template>
  <!-- Spacer, which helps, when header becomes fixed -->
  <div v-if="scrollOffset >= 66" class="spacer">&nbsp;</div>
  <div :class="{ fixed: scrollOffset >= 66 }">
    <div class="header-menu">
      <div class="container" style="height: 100%">
        <div class="menu-container">
          <div class="menu-container-left">
            <button class="link-menu">
              <svg class="icon-menu">
                <use xlink:href="#Main_menu_burger"></use>
              </svg>
            </button>
            <ul class="dropmenu">
              <li class="subMenu-place">
                <NavMenu />
              </li>
            </ul>
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
  <!--  <svg width="0" height="0" class="hidden" display="none">-->
  <!--    <symbol id="Main_menu_burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">-->
  <!--      <path d="M3 12H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
  <!--      <path d="M3 6H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
  <!--      <path d="M3 18H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>-->
  <!--    </symbol>-->

  <!--&lt;!&ndash;    <svg width="0" height="0" class="hidden">&ndash;&gt;-->
  <!--&lt;!&ndash;      <symbol id="icon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">&ndash;&gt;-->
  <!--&lt;!&ndash;        <path&ndash;&gt;-->
  <!--&lt;!&ndash;          d="M9 15H11V9H9V15ZM10 5C9.5 5 9 5.5 9 6C9 6.5 9.5 7 10 7C10.5 7 11 6.5 11 6C11 5.5 10.5 5 10 5ZM10 1C5 1 1 5 1 10C1 15 5 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1ZM10 17C6.1 17 3 13.9 3 10C3 6.1 6.1 3 10 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 10 17Z"&ndash;&gt;-->
  <!--&lt;!&ndash;        ></path>&ndash;&gt;-->
  <!--&lt;!&ndash;      </symbol>&ndash;&gt;-->
  <!--&lt;!&ndash;    </svg>&ndash;&gt;-->
  <!--  </svg>-->
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
  height: auto;
}
.menu-container-left {
  display: flex;
  align-items: center;
}
.menu-container {
  display: flex;
  // justify-content: space-evenly;
  justify-content: space-between;
  height: auto;

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
  font-weight: normal;
  color: #343e5c;
  background: #f0f2f7;
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
  height: auto;
}

.el-row {
  height: auto;
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
  height: auto !important;
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

.menu-container-left {
  align-items: center;
  display: none;
}

li:hover {
  background: #ffffff;
  cursor: pointer;
}

.link-menu:focus ~ .dropmenu,
.link-menu:active ~ .dropmemu,
.dropmenu:hover {
  display: block;
}

.link-menu:focus-within {
  stroke: #379fff;
}

li .dropmenu {
  position: absolute;
  left: 45%;
  transform: translateX(-45%);
  z-index: 99;
  margin-top: 22px;
  cursor: pointer;
}

.dropmenu {
  z-index: 98;
}

@media screen and (max-width: 1090px) {
  .menu-container-center {
    display: none;
  }
  .open-menu-button,
  .drawer {
    display: unset;
  }

  .menu-container-left {
    display: flex;
    align-items: center;
  }
}

.header-menu {
  background: #f0f2f7;
  height: auto;
  border-top: 1px solid #dfe4ee;
  box-shadow: 0 4px 4px (rgba($color: #000000, $alpha: 0.2));
  position: relative;
  z-index: 5;
}

.header-menu:after {
  z-index: -40;
}

// li:hover {
//   background: #ffffff;
//   cursor: pointer;
// }

.dropmenu {
  display: none;
  position: relative;
}

.subMenu-place {
  position: absolute;
  top: 50px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-flow: row wrap;
  padding: 1px 0px 1px 0px;
  width: 210px;
  left: -50px;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}
</style>
