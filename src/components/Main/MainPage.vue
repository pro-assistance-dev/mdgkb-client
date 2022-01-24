<template>
  <MainSpecialServices />
  <MainDoctors />
  <MainMedicalProfiles />
  <MainEvents />
  <MainArticles />
  <MainReviews />
  <MainCertificates />
  <MainSocialMedia />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainArticles from '@/components/Main/MainArticles.vue';
import MainCertificates from '@/components/Main/MainCertificates.vue';
import MainDoctors from '@/components/Main/MainDoctors.vue';
import MainEvents from '@/components/Main/MainEvents.vue';
import MainMedicalProfiles from '@/components/Main/MainMedicalProfiles.vue';
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
  },
});
</script>

<style scoped lang="scss">
:deep(.el-main) {
  padding: 0;
}
</style>
