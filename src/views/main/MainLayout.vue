<template>
  <div id="app">
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
    <FooterTop />
    <FooterBottom />
  </div>
</template>

<script lang="ts">
import HeaderTop from '@/views/main-layout/HeaderTop.vue';
import HeaderBottom from '@/views/main-layout/HeaderBottom.vue';
import FooterTop from '@/views/main-layout/FooterTop.vue';
import FooterBottom from '@/views/main-layout/FooterBottom.vue';

export default {
  name: 'MainLayout',
  components: {
    FooterBottom,
    FooterTop,
    HeaderBottom,
    HeaderTop,
  },
  async setup() {
    //     const error: Error | undefined= undefined
    //     onErrorCaptured((e : Error) => {
    //         error = e
    //         return true
    //     })
    // return { error }
  },
};
</script>
