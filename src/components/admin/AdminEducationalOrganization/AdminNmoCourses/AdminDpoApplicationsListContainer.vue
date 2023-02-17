<template>
  <AdminDpoApplicationsList :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminDpoApplicationsList from '@/components/admin/AdminEducationalOrganization/AdminNmoCourses/AdminDpoApplicationsList.vue';

export default defineComponent({
  name: 'AdminDpoApplicationsListContainer',
  components: { AdminDpoApplicationsList },
});
</script>
