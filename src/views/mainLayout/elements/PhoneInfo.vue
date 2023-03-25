<template>
  <ul class="menu-right">
    <li class="login">
      <div v-if="scrollOffset >= 66 || mobileWindow" class="menu-right-block">
        <div class="login-and-search">
          <LoginDropdownMenu />
          <el-button v-if="scrollOffset >= 66 || tabletWindow" class="search" icon="el-icon-search" @click="click"></el-button>
        </div>
      </div>
    </li>
    <li class="phone">
      <div v-if="scrollOffset < 66" class="menu-right-block">
        <p class="phone"><a class="phone" href="tel:+7 (495) 959-88-00">+7 (495) 959-88-00</a></p>
        <p class="phone"><a class="phone" href="tel:+7 (495) 959-88-03">+7 (495) 959-88-03</a></p>
      </div>
    </li>
    <li class="info">
      <button class="info">
        <svg class="icon-info">
          <use xlink:href="#icon-info"></use>
        </svg>
      </button>
      <div class="info-block">
        <div class="margin-bottom font-weight-600">
          <a href="tel:+7 (495) 959-88-00">+7 (495) 959-88-00</a><br />
          <a href="tel:+7 (495) 959-88-03">+7 (495) 959-88-03</a>
        </div>
        <div class="call-center margin-bottom">Call-центр принимает звонки круглосуточно и без выходных. По России звонок бесплатный.</div>
        <div class="address margin-bottom font-weight-600">119049 г. Москва, 4-й Добрынинский переулок, дом 1/9</div>
        <div class="address2 margin-bottom">Вход на территорию больницы с 1-ого Добрынинского переулка.</div>
        <div class="icons">
          <a href="https://t.me/morozdgkbdzm" class="social-icon" target="_blank">
            <svg class="icon-ok">
              <use xlink:href="#telegram"></use>
            </svg>
          </a>
          <a href="https://ok.ru/group/61174577365147" class="social-icon" target="_blank">
            <svg class="icon-ok">
              <use xlink:href="#odnoklassniki"></use>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCG0gK-lfsZUVe6TvTrZh8uA" class="social-icon" target="_blank">
            <svg class="icon-yt">
              <use xlink:href="#icon-YT"></use>
            </svg>
          </a>
          <a href="https://vk.com/morozdgkbdzm" class="social-icon" target="_blank">
            <svg class="icon-vk">
              <use xlink:href="#icon-VK"></use>
            </svg>
          </a>
        </div>
      </div>
    </li>
  </ul>
  <SocialIcons />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SocialIcons from '@/assets/svg/Main/SocialIcons.svg';
import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';

export default defineComponent({
  name: 'PhoneInfo',
  components: {
    LoginDropdownMenu,
    SocialIcons,
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

    const click = () => {
      router.push({
        path: '/search',
      });
    };

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
      click,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.menu-right-block {
  min-width: 150px;
  align-items: center;
}

ul.menu-right {
  display: flex;
  height: 58px;
  align-items: center;
}

ul.menu-right li {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  display: flex;
  margin-left: 7px;
  margin-right: 7px;
  color: #343e5c;
  text-align: right;
}

.icon-info {
  width: 20px;
  height: 20px;
  fill: #1979cf;
  transition: 0.25s;
  cursor: pointer;
  display: flex;
}

.icon-info:hover {
  fill: #0034cf;
}

.icon-ok {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-ok:hover {
  fill: #133dcc;
}

.icon-tg {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-tg:hover {
  fill: #133dcc;
}

.icon-yt {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-yt:hover {
  fill: #133dcc;
}

.icon-vk {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-vk:hover {
  fill: #133dcc;
}

.info {
  position: relative;
  display: inline-block;
  align-content: center;
}

.info-block {
  position: absolute;
  white-space: auto;
  height: auto;
  display: none;
  position: absolute;
  top: 60px;
  right: 0px;
  background: #ffffff;
  align-content: left;
  padding: 10px;
  border: 1px solid #dfe4ee;
  border-radius: 5px;
  width: 25rem;
  text-align: left;
}

.info:focus ~ .info-block,
.info:active ~ .info-block,
.info-block:hover {
  display: block;
}

button {
  padding: 0;
  border: none;
  font: 40px;
  color: inherit;
  background-color: #f0f2f7;
  cursor: pointer;
}

.search {
  margin-left: 20px;
  padding: 23px;
  height: 58px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f7;
  border: none;
  color: #343e5c;
  border-radius: 0px;
}

.search:hover {
  background-color: #ffffff;
  color: #343e5c;
}

.login-and-search {
  display: flex;
  align-content: center;
}

.margin-bottom {
  margin-bottom: 0.5rem;
}

.font-weight-600 {
  font-weight: 600;
}

.phone {
  color: #343e5c;
}

@media screen and (max-width: 480px) {
  .phone {
    display: none;
  }

  .info {
    display: none;
  }

  .menu-right ul {
    display: flex;
    width: auto;
  }

  .search {
    margin-left: 0px;
  }

  .menu-right-block {
    min-width: 0;
    align-items: center;
  }

  ul.menu-right li {
    margin-left: 0px;
    margin-right: 0px;
  }
}

@media screen and (max-width: 370px) {
  .search {
    display: none;
  }
}
</style>
