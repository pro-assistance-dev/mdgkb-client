<template>
  <AdminDpoCoursesList :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminDpoCoursesList from '@/components/admin/AdminEducationalOrganization/AdminDpoCourses/AdminDpoCoursesList.vue';

export default defineComponent({
  name: 'AdminDpoCoursesListContainer',
  components: { AdminDpoCoursesList },
});
</script>
