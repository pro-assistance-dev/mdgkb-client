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
        <p class="phone">+7 (495) 959-88-00</p>
        <p class="phone">+7 (495) 959-88-03</p>
      </div>
    </li>
    <li class="info">
      <button class="info">
        <svg class="icon-info">
          <use xlink:href="#icon-info"></use>
        </svg>
      </button>
      <div class="info-block">
        <div>
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
          <!-- <a href="https://www.facebook.com/Morozdgkbdzm/" class="social-icon" target="_blank">
            <svg class="icon-fb">
              <use xlink:href="#icon-FB"></use>
            </svg>
          </a>
          <a href="https://www.instagram.com/Morozdgkbdzm/" class="social-icon" target="_blank">
            <svg class="icon-insta">
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a> -->
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

  <svg width="0" height="0" class="hidden">
    <symbol id="icon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
        d="M9 15H11V9H9V15ZM10 5C9.5 5 9 5.5 9 6C9 6.5 9.5 7 10 7C10.5 7 11 6.5 11 6C11 5.5 10.5 5 10 5ZM10 1C5 1 1 5 1 10C1 15 5 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1ZM10 17C6.1 17 3 13.9 3 10C3 6.1 6.1 3 10 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 10 17Z"
      ></path>
    </symbol>

    <symbol id="icon-insta" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="M15.6105 10.4074C12.7433 10.4074 10.4035 12.7473 10.4035 15.6144C10.4035 18.4816 12.7433 20.8215 15.6105 20.8215C18.4777 20.8215 20.8176 18.4816 20.8176 15.6144C20.8176 12.7473 18.4777 10.4074 15.6105 10.4074ZM31.2277 15.6144C31.2277 13.4582 31.2473 11.3215 31.1262 9.16913C31.0051 6.66913 30.4348 4.45038 28.6066 2.62226C26.7746 0.790224 24.5598 0.223818 22.0598 0.102724C19.9035 -0.0183694 17.7668 0.00116189 15.6144 0.00116189C13.4582 0.00116189 11.3215 -0.0183694 9.16913 0.102724C6.66913 0.223818 4.45038 0.79413 2.62226 2.62226C0.790224 4.45429 0.223818 6.66913 0.102724 9.16913C-0.0183694 11.3254 0.00116189 13.4621 0.00116189 15.6144C0.00116189 17.7668 -0.0183694 19.9074 0.102724 22.0598C0.223818 24.5598 0.794131 26.7785 2.62226 28.6066C4.45429 30.4387 6.66913 31.0051 9.16913 31.1262C11.3254 31.2473 13.4621 31.2277 15.6144 31.2277C17.7707 31.2277 19.9074 31.2473 22.0598 31.1262C24.5598 31.0051 26.7785 30.4348 28.6066 28.6066C30.4387 26.7746 31.0051 24.5598 31.1262 22.0598C31.2512 19.9074 31.2277 17.7707 31.2277 15.6144ZM15.6105 23.6262C11.1769 23.6262 7.59882 20.048 7.59882 15.6144C7.59882 11.1808 11.1769 7.60272 15.6105 7.60272C20.0441 7.60272 23.6223 11.1808 23.6223 15.6144C23.6223 20.048 20.0441 23.6262 15.6105 23.6262ZM23.9504 9.14569C22.9152 9.14569 22.0793 8.30975 22.0793 7.2746C22.0793 6.23944 22.9152 5.4035 23.9504 5.4035C24.9855 5.4035 25.8215 6.23944 25.8215 7.2746C25.8218 7.5204 25.7736 7.76385 25.6797 7.991C25.5858 8.21815 25.4479 8.42454 25.2741 8.59835C25.1003 8.77216 24.8939 8.90997 24.6668 9.00389C24.4396 9.09781 24.1962 9.146 23.9504 9.14569Z"
      ></path>
    </symbol>

    <symbol id="icon-FB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <g clip-path="url(#clip0_1218_48)">
        <path
          d="M182.594 0C81.445 0 0 81.445 0 182.594V817.407C0 918.556 81.445 1000 182.594 1000H526.657V609.063H423.282V468.313H526.657V348.063C526.657 253.588 587.736 166.844 728.438 166.844C785.406 166.844 827.532 172.313 827.532 172.313L824.219 303.751C824.219 303.751 781.256 303.345 734.375 303.345C683.636 303.345 675.5 326.723 675.5 365.533V468.314H828.25L821.594 609.064H675.5V1000H817.406C918.555 1000 1000 918.557 1000 817.408V182.595C1000 81.446 918.555 0.001 817.406 0.001H182.593L182.594 0Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1218_48">
          <rect width="1000" height="1000" fill="white"></rect>
        </clipPath>
      </defs>
    </symbol>

    <symbol id="icon-YT" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <path
        d="M17.9492 22.9492V19.8828C17.9492 19.2318 17.7604 18.9062 17.3828 18.9062C17.1615 18.9062 16.9466 19.0104 16.7383 19.2188V23.5938C16.9466 23.8021 17.1615 23.9062 17.3828 23.9062C17.7604 23.9062 17.9492 23.5872 17.9492 22.9492ZM21.543 20.5664H22.832V19.9023C22.832 19.2383 22.6172 18.9062 22.1875 18.9062C21.7578 18.9062 21.543 19.2383 21.543 19.9023V20.5664ZM10.3906 15.3711V16.7383H8.82812V25H7.38281V16.7383H5.85938V15.3711H10.3906ZM14.3164 17.832V25H13.0078V24.2188C12.5 24.8047 12.0052 25.0977 11.5234 25.0977C11.0938 25.0977 10.8203 24.9154 10.7031 24.5508C10.625 24.3294 10.5859 23.9779 10.5859 23.4961V17.832H11.875V23.1055C11.875 23.418 11.8815 23.5872 11.8945 23.6133C11.9076 23.8086 12.0052 23.9062 12.1875 23.9062C12.4479 23.9062 12.7214 23.7044 13.0078 23.3008V17.832H14.3164ZM19.2383 20V22.8516C19.2383 23.5286 19.1927 24.0039 19.1016 24.2773C18.9453 24.8242 18.6003 25.0977 18.0664 25.0977C17.6107 25.0977 17.168 24.8307 16.7383 24.2969V25H15.4297V15.3711H16.7383V18.5156C17.1549 17.9948 17.5977 17.7344 18.0664 17.7344C18.6003 17.7344 18.9453 18.0078 19.1016 18.5547C19.1927 18.8281 19.2383 19.3099 19.2383 20ZM24.1406 22.5195V22.6953C24.1406 23.0729 24.1276 23.3529 24.1016 23.5352C24.0625 23.8216 23.9648 24.082 23.8086 24.3164C23.457 24.8372 22.9362 25.0977 22.2461 25.0977C21.569 25.0977 21.0417 24.8503 20.6641 24.3555C20.3906 24.0039 20.2539 23.444 20.2539 22.6758V20.1562C20.2539 19.388 20.3841 18.8281 20.6445 18.4766C21.0221 17.9818 21.543 17.7344 22.207 17.7344C22.8711 17.7344 23.3789 17.9818 23.7305 18.4766C24.0039 18.8542 24.1406 19.4141 24.1406 20.1562V21.6406H21.543V22.9102C21.543 23.5742 21.7643 23.9062 22.207 23.9062C22.5195 23.9062 22.7148 23.737 22.793 23.3984C22.793 23.3854 22.7962 23.3398 22.8027 23.2617C22.8092 23.1836 22.8125 23.0762 22.8125 22.9395V22.5195H24.1406ZM15.332 6.42578V9.47266C15.332 10.1367 15.1237 10.4688 14.707 10.4688C14.2904 10.4688 14.082 10.1367 14.082 9.47266V6.42578C14.082 5.7487 14.2904 5.41016 14.707 5.41016C15.1237 5.41016 15.332 5.7487 15.332 6.42578ZM25.7422 20.3516C25.7422 18.0469 25.6185 16.3542 25.3711 15.2734C25.2409 14.7005 24.9609 14.222 24.5312 13.8379C24.1016 13.4538 23.6068 13.2292 23.0469 13.1641C21.276 12.9688 18.5938 12.8711 15 12.8711C11.4193 12.8711 8.74349 12.9688 6.97266 13.1641C6.39974 13.2292 5.90169 13.4538 5.47852 13.8379C5.05534 14.222 4.77865 14.7005 4.64844 15.2734C4.38802 16.4062 4.25781 18.099 4.25781 20.3516C4.25781 22.6432 4.38802 24.3359 4.64844 25.4297C4.77865 25.9896 5.05534 26.4648 5.47852 26.8555C5.90169 27.2461 6.39323 27.474 6.95312 27.5391C8.73698 27.7344 11.4193 27.832 15 27.832C18.5807 27.832 21.263 27.7344 23.0469 27.5391C23.6068 27.474 24.0983 27.2461 24.5215 26.8555C24.9447 26.4648 25.2214 25.9896 25.3516 25.4297C25.612 24.3359 25.7422 22.6432 25.7422 20.3516ZM10.9961 7.63672L12.7539 1.85547H11.2891L10.293 5.66406L9.25781 1.85547H7.73438C7.82552 2.15495 7.97526 2.60417 8.18359 3.20312L8.65234 4.55078C9.10807 5.89193 9.40755 6.92057 9.55078 7.63672V11.5625H10.9961V7.63672ZM16.6406 9.21875V6.67969C16.6406 5.92448 16.5039 5.35807 16.2305 4.98047C15.8529 4.48568 15.3451 4.23828 14.707 4.23828C14.043 4.23828 13.5352 4.48568 13.1836 4.98047C12.9102 5.35807 12.7734 5.92448 12.7734 6.67969V9.21875C12.7734 9.97396 12.9102 10.5404 13.1836 10.918C13.5352 11.4128 14.043 11.6602 14.707 11.6602C15.3451 11.6602 15.8529 11.4128 16.2305 10.918C16.5039 10.5664 16.6406 10 16.6406 9.21875ZM20.1758 11.5625H21.4844V4.33594H20.1758V9.86328C19.8893 10.2669 19.6159 10.4688 19.3555 10.4688C19.1602 10.4688 19.056 10.3646 19.043 10.1562C19.0299 10.1302 19.0234 9.96094 19.0234 9.64844V4.33594H17.7148V10.0586C17.7148 10.5404 17.7539 10.8984 17.832 11.1328C17.9753 11.4844 18.2552 11.6602 18.6719 11.6602C19.1406 11.6602 19.6419 11.3672 20.1758 10.7812V11.5625ZM30 5.625V24.375C30 25.9245 29.4499 27.2493 28.3496 28.3496C27.2493 29.4499 25.9245 30 24.375 30H5.625C4.07552 30 2.75065 29.4499 1.65039 28.3496C0.55013 27.2493 0 25.9245 0 24.375V5.625C0 4.07552 0.55013 2.75065 1.65039 1.65039C2.75065 0.55013 4.07552 0 5.625 0H24.375C25.9245 0 27.2493 0.55013 28.3496 1.65039C29.4499 2.75065 30 4.07552 30 5.625Z"
      ></path>
    </symbol>

    <symbol id="icon-VK" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <g clip-path="url(#clip0_1218_46)">
        <path
          d="M20.911 0H11.088C2.12402 0 -0.000976562 2.125 -0.000976562 11.089V20.912C-0.000976562 29.876 2.12402 32.001 11.088 32.001H20.911C29.875 32.001 32 29.876 32 20.912V11.089C32 2.125 29.854 0 20.911 0ZM25.833 22.828H23.51C22.63 22.828 22.359 22.13 20.776 20.526C19.401 19.193 18.792 19.016 18.453 19.016C17.974 19.016 17.838 19.151 17.838 19.808V21.907C17.838 22.47 17.661 22.808 16.171 22.808C13.707 22.808 10.973 21.318 9.05602 18.542C6.16502 14.474 5.37402 11.427 5.37402 10.797C5.37402 10.458 5.50902 10.141 6.16002 10.141H8.48802C9.07702 10.141 9.30102 10.412 9.53002 11.042C10.681 14.365 12.598 17.276 13.389 17.276C13.681 17.276 13.816 17.141 13.816 16.396V12.964C13.727 11.381 12.894 11.245 12.894 10.683C12.894 10.412 13.118 10.141 13.477 10.141H17.138C17.633 10.141 17.815 10.412 17.815 10.995V15.625C17.815 16.125 18.039 16.302 18.174 16.302C18.466 16.302 18.716 16.125 19.257 15.583C20.929 13.708 22.127 10.817 22.127 10.817C22.283 10.478 22.554 10.161 23.143 10.161H25.471C26.169 10.161 26.325 10.52 26.169 11.02C25.877 12.374 23.028 16.395 23.028 16.395C22.783 16.801 22.689 16.978 23.028 17.431C23.278 17.77 24.091 18.473 24.632 19.103C25.627 20.233 26.392 21.181 26.596 21.837C26.825 22.488 26.487 22.827 25.83 22.827L25.833 22.828Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1218_46">
          <rect width="32" height="32" fill="white"></rect>
        </clipPath>
      </defs>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';

export default defineComponent({
  name: 'PhoneInfo',
  components: {
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

.hidden {
  display: none;
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

.icon-fb {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-fb:hover {
  fill: #133dcc;
}

.icon-insta {
  width: 25px;
  height: 25px;
  fill: #406cff;
  transition: 0.25s;
  cursor: pointer;
  padding: 10px;
}

.icon-insta:hover {
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
}

.info:focus ~ .info-block,
.info:active ~ .info-block,
.info-block:hover {
  display: block;
}

// .burger-menu:focus-within {
//   fill: #0034CF;
// }

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
