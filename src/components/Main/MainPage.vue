<template>
  <!-- <MainHeaderButtons /> -->
  <MainInfo />
  <MainNewsBlock />
  <div class="hidden"><MainSpecialServices /></div>
  <MainDoctors />
  <MainMedicalProfiles />
  <!-- <MainEvents /> -->
  <MainArticles />
  <MainReviews />
  <!-- <MainCertificates /> -->
  <div class="hidden">
    <MainSocialMedia />
  </div>
  <MainPageFooter />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

import MainArticles from '@/components/Main/MainArticles.vue';
// import MainCertificates from '@/components/Main/MainCertificates.vue';
import MainDoctors from '@/components/Main/MainDoctors.vue';
import MainEvents from '@/components/Main/MainEvents.vue';
// import MainHeaderButtons from '@/components/Main/MainHeaderButtons.vue';
import MainInfo from '@/components/Main/MainInfo.vue';
import MainMedicalProfiles from '@/components/Main/MainMedicalProfiles.vue';
import MainNewsBlock from '@/components/Main/MainNewsBlock.vue';
import MainPageFooter from '@/components/Main/MainPageFooter.vue';
import MainSpecialServices from '@/components/Main/MainSpecialServices.vue';

const MainReviews = defineAsyncComponent({
  loader: () => import('@/components/Main/MainReviews.vue' /* webpackChunkName: "mainReviews" */),
  delay: 100,
});

const MainSocialMedia = defineAsyncComponent({
  loader: () => import('@/components/Main/MainSocialMedia.vue' /* webpackChunkName: "mainSocialMedia" */),
  delay: 200,
});

export default defineComponent({
  name: 'MainPage',
  components: {
    MainSpecialServices,
    MainDoctors,
    MainReviews,
    MainMedicalProfiles,
    // MainEvents,
    MainArticles,
    // MainCertificates,
    MainSocialMedia,
    // MainHeaderButtons,
    MainInfo,
    MainPageFooter,
    MainNewsBlock,
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 980px) {
  .hidden {
    display: none;
  }
}
</style>
