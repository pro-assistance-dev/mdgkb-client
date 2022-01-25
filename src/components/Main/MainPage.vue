<template>
  <MainHeaderButtons />
  <MainInfo />
  <MainSpecialServices />
  <MainDoctors />
  <MainMedicalProfiles />
  <MainEvents />
  <MainArticles />
  <MainReviews />
  <MainCertificates />
  <MainSocialMedia />
  <MainPageFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainArticles from '@/components/Main/MainArticles.vue';
import MainCertificates from '@/components/Main/MainCertificates.vue';
import MainDoctors from '@/components/Main/MainDoctors.vue';
import MainEvents from '@/components/Main/MainEvents.vue';
import MainHeaderButtons from '@/components/Main/MainHeaderButtons.vue';
import MainInfo from '@/components/Main/MainInfo.vue';
import MainMedicalProfiles from '@/components/Main/MainMedicalProfiles.vue';
import MainPageFooter from '@/components/Main/MainPageFooter.vue';
import MainReviews from '@/components/Main/MainReviews.vue';
import MainSocialMedia from '@/components/Main/MainSocialMedia.vue';
import MainSpecialServices from '@/components/Main/MainSpecialServices.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    MainSpecialServices,
    MainDoctors,
    MainReviews,
    MainMedicalProfiles,
    MainEvents,
    MainArticles,
    MainCertificates,
    MainSocialMedia,
    MainHeaderButtons,
    MainInfo,
    MainPageFooter,
  },
});
</script>

<style scoped lang="scss">
:deep(.el-main) {
  padding: 0;
}
</style>
