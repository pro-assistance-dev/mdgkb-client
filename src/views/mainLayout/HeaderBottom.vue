<template>
  <!-- Spacer, which helps, when header becomes fixed -->
  <div class="spacer" v-if="scrollOffset >= 66">&nbsp;</div>
  <!-- Adaptive side menu -->
  <div class="drawer hidden-lg-and-up">
    <el-drawer :size="'auto'" v-model="showDrawer" direction="ltr" :with-header="false">
      <div class="drawer-block">
        <NavMenu :vertical="true" style="min-width: 200px" @changeDrawerStatus="changeDrawerStatus" />
      </div>
    </el-drawer>
  </div>
  <!-- Fix header when headerTop was passed -->
  <div :class="{ fixed: scrollOffset >= 66 }">
    <div class="header-bottom">
      <div class="container" style="height: 100%">
        <el-row align="middle">
          <el-col :xs="14" :sm="14" :md="14" :lg="4" :xl="4">
            <div style="display: flex">
              <el-button icon="el-icon-s-unfold" @click="changeDrawerStatus" class="menu-item hidden-lg-and-up"></el-button>
              <el-button class="menu-item" v-if="scrollOffset >= 66">
                <img alt="Buefy" src="@/assets/img/mdgkb-logo-mini.png" @click="$router.push('/')" />
              </el-button>
            </div>
          </el-col>
          <el-col :xs="0" :sm="0" :md="0" :lg="16" :xl="16" style="height: 56px">
            <div class="flex-center">
              <NavMenu />
            </div>
          </el-col>
          <el-col :xs="10" :sm="10" :md="10" :lg="4" :xl="4" class="info">
            <div class="flex-end">
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
                        <div>
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
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref, defineComponent, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import NavMenu from '@/views/mainLayout/elements/NavMenu.vue';
import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';

export default defineComponent({
  name: 'HeaderBottom',
  components: {
    NavMenu,
    LoginDropdownMenu,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const scrollOffset = ref(0);
    const previousOffset = ref(0);
    const rememberedOffset = ref(0);

    const nav = async (to: string) => {
      await router.push(to);
    };

    const login = () => store.commit('auth/openModal', true);
    const register = () => store.commit('auth/openModal');
    const logout = async () => await store.dispatch('auth/logout');
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const handleScroll = () => {
      if (scrollOffset.value > previousOffset.value && rememberedOffset.value != 0) {
        rememberedOffset.value = 0;
      }
      previousOffset.value = scrollOffset.value;
      scrollOffset.value = window.scrollY;
    };

    onMounted(() => window.addEventListener('scroll', handleScroll));
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    const showDrawer = ref(false);
    const changeDrawerStatus = () => (showDrawer.value = !showDrawer.value);

    return { scrollOffset, previousOffset, rememberedOffset, showDrawer, changeDrawerStatus, login, register, logout, isAuth, nav };
  },
});
</script>

<style scoped lang="scss">
.menu-item {
  height: 56px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item:hover {
  background-color: #e4e5e7;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
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

.header-logo-img {
  transition: all 0.3s;
}

.header-logo-img:hover {
  cursor: pointer;
  opacity: 0.7;
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
  background-color: whitesmoke;

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

:deep(.el-submenu__title) {
  height: 56px !important;
}
.anticon {
  margin-right: 5px;
}
</style>
