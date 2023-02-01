<template>
  <AdminTeacherPage :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminTeacherPage from '@/components/admin/AdminEducationalOrganization/AdminTeachers/AdminTeacherPage.vue';

export default defineComponent({
  name: 'AdminTeacherPageContainer',
  components: { AdminTeacherPage },
});
</script>
