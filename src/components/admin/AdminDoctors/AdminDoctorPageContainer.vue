<template>
  <AdminDoctorPage :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminDoctorPage from '@/components/admin/AdminDoctors/AdminDoctorPage.vue';

export default defineComponent({
  name: 'AdminDoctorPageContainer',
  components: { AdminDoctorPage },
});
</script>
