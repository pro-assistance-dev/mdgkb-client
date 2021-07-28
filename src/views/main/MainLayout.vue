<template>
  <AuthPage />
  <div style="position: relative">
    <HeaderTop />
    <HeaderBottom />
    <!-- <NewsCarousel v-if="$route.meta.carousel" /> -->
    <div class="container">
      <el-main>
        <template #default v-if="$route.meta.profile">
          <el-row :gutter="20">
            <el-col :span="6">
              <ProfileSideMenu />
            </el-col>
            <el-col :span="18">
              <slot />
            </el-col>
          </el-row>
        </template>
        <template #default v-else>
          <slot />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </el-main>
    </div>
    <div style="position: sticky">
      <FooterTop />
      <FooterBottom />
    </div>
  </div>
</template>

<script lang="ts">
import HeaderTop from '@/views/mainLayout/HeaderTop.vue';
import HeaderBottom from '@/views/mainLayout/HeaderBottom.vue';
import FooterTop from '@/views/mainLayout/FooterTop.vue';
import FooterBottom from '@/views/mainLayout/FooterBottom.vue';
import ProfileSideMenu from '@/views/mainLayout/ProfileSideMenu.vue';
import AuthPage from '@/components/Auth/AuthPage.vue';
// import NewsCarousel from '@/components/NewsCarousel.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    // NewsCarousel,
    FooterBottom,
    FooterTop,
    HeaderBottom,
    HeaderTop,
    AuthPage,
    ProfileSideMenu,
  },
  async setup() {
    //     const error: Error | undefined= undefined
    //     onErrorCaptured((e : Error) => {
    //         error = e
    //         return true
    //     })
  },
});
</script>

<style scoped lang="scss">
.profile-container {
  margin: 0 auto;
}
</style>
