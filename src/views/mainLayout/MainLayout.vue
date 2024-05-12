<template>
  <AuthModal v-if="modal.visible" @action="authAct" />
  <AuthPage />
  <SearchDrawer />
  <div style="position: relative">
    <div v-if="!isClose" class="blur" @click="isClose = true"></div>
    <StartModal color="#343D5C" margin="auto" :is-close="isClose">
      <template #icon>
        <svg class="icon-close" @click="isClose = true">
          <use xlink:href="#close"></use>
        </svg>
        <Close />
      </template>
      <template #title>Сайт работает в тестовом режиме</template>
      <template #info>
        Вы можете: посмотреть новости, информацию об образовании, сведения о медицинской организации и информацию для
        пациенов.
      </template>
      <template #button>
        <button class="make-green" @click="clickHandler">Понятно</button>
      </template>
    </StartModal>
    <HeaderTop />
    <HeaderBottom />
    <div class="main-carousel-container">
      <NewsCarousel v-if="$route.meta.carousel" />
    </div>
    <div v-if="$route.meta.main">
      <slot />
    </div>
    <div v-else class="page-container">
      <div class="container">
        <div class="main-box">
          <template v-if="$route.meta.profile">
            <div class="profile-page-container">
              <ProfileSideMenu />
              <div class="profile-page-container-main">
                <ProfileHeader />
                <slot />
              </div>
            </div>
          </template>
          <template v-else>
            <slot />
          </template>
          <!-- <template #fallback>
            <div>Loading...</div>
          </template> -->
        </div>
      </div>
    </div>
  </div>
  <div class="footer-container">
    <FooterTop />
    <FooterBottom />
  </div>
</template>

<script lang="ts" setup>

import Close from '@/assets/svg/Main/Close.svg';
import Cache from '@/services/Cache';

const FooterTop = defineAsyncComponent({
  loader: () => import('@/views/mainLayout/FooterTop.vue' /* webpackChunkName: "footerTop" */),
  delay: 200,
});
const FooterBottom = defineAsyncComponent(() => import('@/views/mainLayout/FooterBottom.vue' /* webpackChunkName: "footerBottom" */));

const auth: ComputedRef<Auth> = Store.Getters('auth/auth')
onBeforeMount(async () => {
  if (auth.value.isAuth) {
    await Store.Get('users', auth.value.user.get().id);
  }
  mounted.value = true;
});
const cache = new Cache();
cache.name = 'startModal';
const modal = Store.Getters('auth/modal')
const form = Store.Getters('auth/form')
// const isClose = ref(cache.getFromCache(3) || false);
const isClose = ref(true);

const clickHandler = () => {
  isClose.value = true;
  cache.cache(isClose.value);
};
const authAct = async () => {
  if (form.value.isLogin()) {
    modal.value.close()
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/base-style.scss';

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.4;
  z-index: 100;
}

.profile-page-container {
  display: flex;
  width: 100%;

  &-main {
    max-width: 1034px;
    width: 100%;
  }
}

.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f6f6f6;
  // min-height: calc(100vh - 124px);
}

.main-carousel-container {
  // margin: 0 auto 30px; // + 20px от контейнера элемента = как в макете - 50px
  position: relative;
  z-index: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.main-box {
  padding-top: 0px;
  margin: 20px 0;
  min-height: 80vh;
}

:deep(.el-checkbox__inner) {
  width: 18px;
  height: 18px;
  border: 2px solid #b5b5b5;
}

:deep(.el-checkbox__inner::after) {
  height: 10px;
  width: 6px;
  top: 0px;
}

.icon-close {
  width: 16px;
  height: 16px;
  fill: #343d5c;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.7;
}

.icon-close:hover {
  opacity: 1;
}

.make-green {
  width: 230px;
  font-weight: $base-font-weight;
  font-size: 14px;
  border-radius: 10px;
  background: #31ae5e;
  padding: 15px 0px;
  height: auto;
  letter-spacing: 2px;
  color: #ffffff;
  border: 1px solid rgb(black, 0.05);
  margin: 20px 0 0 0;

  &:hover {
    cursor: pointer;
    background: #47cc77;
  }
}
</style>
