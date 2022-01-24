<template>
  <MainSpecialServices />
  <MainDoctors />
  <MainMedicalProfiles />
  <MainEvents />
  <MainReviews />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainDoctors from '@/components/Main/MainDoctors.vue';
import MainEvents from '@/components/Main/MainEvents.vue';
import MainMedicalProfiles from '@/components/Main/MainMedicalProfiles.vue';
import MainReviews from '@/components/Main/MainReviews.vue';
import MainSpecialServices from '@/components/Main/MainSpecialServices.vue';

export default defineComponent({
  name: 'MainPage',
  components: { MainSpecialServices, MainDoctors, MainReviews, MainMedicalProfiles, MainEvents },
});
</script>

<style scoped lang="scss">
:deep(.el-main) {
  padding: 0;
}
</style>
