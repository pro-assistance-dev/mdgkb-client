<template>
  <AdminAppointmentPage :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminAppointmentPage from '@/components/admin/AdminAppointments/AdminAppointmentPage.vue';

export default defineComponent({
  name: 'AdminAppointmentPageContainer',
  components: { AdminAppointmentPage },
});
</script>
