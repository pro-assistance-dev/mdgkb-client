<template>
  <!-- <MainHeaderButtons /> -->
  <MainInfo />
  <MainNewsBlock />
  <MainSpecialServices />
  <MainDoctors />
  <!-- <MainMedicalProfiles /> -->
  <!-- <MainEvents /> -->
  <MainArticles />
  <MainReviews />
  <!-- <MainCertificates /> -->
  <MainPageFooter />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

import MainArticles from '@/components/Main/MainArticles.vue';
// import MainCertificates from '@/components/Main/MainCertificates.vue';
import MainDoctors from '@/components/Main/MainDoctors.vue';
// import MainHeaderButtons from '@/components/Main/MainHeaderButtons.vue';
import MainInfo from '@/components/Main/MainInfo.vue';
import MainNewsBlock from '@/components/Main/MainNewsBlock.vue';
import MainPageFooter from '@/components/Main/MainPageFooter.vue';
import MainSpecialServices from '@/components/Main/MainSpecialServices.vue';

const MainReviews = defineAsyncComponent({
  loader: () => import('@/components/Main/MainReviews.vue' /* webpackChunkName: "mainReviews" */),
  delay: 100,
});

export default defineComponent({
  name: 'MainPage',
  components: {
    MainSpecialServices,
    MainDoctors,
    MainReviews,
    // MainEvents,
    MainArticles,
    // MainCertificates,
    // MainHeaderButtons,
    MainInfo,
    MainPageFooter,
    MainNewsBlock,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@media screen and (max-width: 980px) {
  .hidden {
    display: none;
  }
}
</style>
