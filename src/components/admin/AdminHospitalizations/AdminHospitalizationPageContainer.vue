<template>
  <AdminHospitalizationPage :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminHospitalizationPage from '@/components/admin/AdminHospitalizations/AdminHospitalizationPage.vue';

export default defineComponent({
  name: 'AdminHospitalizationPageContainer',
  components: { AdminHospitalizationPage },
});
</script>
