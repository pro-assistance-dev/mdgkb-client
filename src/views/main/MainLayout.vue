<template>
  <AuthPage />
  <div style="position: relative">
    <HeaderTop />
    <HeaderBottom />
    <!-- <NewsCarousel v-if="$route.meta.carousel" /> -->
    <div class="page-container">
      <div class="container">
        <el-main>
          <template v-if="$route.meta.profile" #default>
            <el-row :gutter="20">
              <el-col :span="6">
                <ProfileSideMenu />
              </el-col>
              <el-col :span="18">
                <slot />
              </el-col>
            </el-row>
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
// import NewsCarousel from '@/components/NewsCarousel.vue';
import { defineComponent } from 'vue';

import AuthPage from '@/components/Auth/AuthPage.vue';
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
  },
});
</script>

<style scoped lang="scss">
.profile-container {
  margin: 0 auto;
}
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 124px);
}
</style>
