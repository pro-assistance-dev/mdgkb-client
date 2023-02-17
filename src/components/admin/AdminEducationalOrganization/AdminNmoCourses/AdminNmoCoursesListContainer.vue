<template>
  <AdminNmoCoursesList :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminNmoCoursesList from '@/components/admin/AdminEducationalOrganization/AdminNmoCourses/AdminNmoCoursesList.vue';

export default defineComponent({
  name: 'AdminNmoCoursesListContainer',
  components: { AdminNmoCoursesList },
});
</script>
о
