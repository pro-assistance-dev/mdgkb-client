<template>
  <AuthPage />
  <SearchDrawer />
  <div style="position: relative">
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
            <div class="profile-container">
              <ProfileSideMenu />
              <div style="width: 100%">
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

<script lang="ts">
import { defineComponent } from 'vue';

import AuthPage from '@/components/Auth/AuthPage.vue';
import NewsCarousel from '@/components/News/NewsCarousel.vue';
import SearchDrawer from '@/views/mainLayout/elements/SearchDrawer.vue';
import FooterBottom from '@/views/mainLayout/FooterBottom.vue';
import FooterTop from '@/views/mainLayout/FooterTop.vue';
import HeaderBottom from '@/views/mainLayout/HeaderBottom.vue';
import HeaderTop from '@/views/mainLayout/HeaderTop.vue';
import ProfileSideMenu from '@/views/mainLayout/ProfileSideMenu.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    FooterBottom,
    FooterTop,
    HeaderBottom,
    HeaderTop,
    AuthPage,
    ProfileSideMenu,
    NewsCarousel,
    SearchDrawer,
  },
});
</script>

<style scoped lang="scss">
.profile-container {
  display: flex;
  width: 100%;
}
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin: 20px;
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
</style>
