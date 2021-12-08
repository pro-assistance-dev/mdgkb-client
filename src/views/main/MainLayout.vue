<template>
  <AuthPage />
  <SearchDrawer />
  <div style="position: relative">
    <HeaderTop />
    <HeaderBottom />
    <div class="main-carousel-container">
      <NewsCarousel v-if="$route.meta.carousel" />
    </div>
    <div class="page-container">
      <div class="container">
        <el-main>
          <template v-if="$route.meta.profile" #default>
            <div class="profile-container">
              <ProfileSideMenu />
              <div style="width: 100%">
                <slot />
              </div>
            </div>
          </template>
          <template v-else #default>
            <slot />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </el-main>
      </div>
      <div class="footer-container">
        <FooterTop />
        <FooterBottom />
      </div>
    </div>
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
  min-height: calc(100vh - 124px);
}
.main-carousel-container {
  margin-top: 5px !important;
  max-width: 1920px;
  margin: 0 auto;
}
</style>
