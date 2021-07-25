<template>
  <AuthPage />
  <div style="position: relative">
    <HeaderTop></HeaderTop>
    <HeaderBottom></HeaderBottom>
    <div class="container">
      <el-main>
        <template #default>
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
import AuthPage from '@/components/Auth/AuthPage.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    FooterBottom,
    FooterTop,
    HeaderBottom,
    HeaderTop,
    AuthPage,
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
