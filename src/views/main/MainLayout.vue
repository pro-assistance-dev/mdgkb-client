<template>
  <div id="app">
    <HeaderTop></HeaderTop>
    <HeaderBottom></HeaderBottom>
    <el-row class="container">
        <el-main><router-view /></el-main>
    </el-row>
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
};
</script>
