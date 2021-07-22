<template>
  <component :is="$route.meta.layout || 'MainLayout'">
    <router-view />
  </component>
</template>

<script lang="ts">
import MainLayout from '@/views/main/MainLayout.vue';
import AdminLayout from '@/views/admin/AdminLayout.vue';
export default {
  name: 'App',
  components: {
    MainLayout,
    AdminLayout,
  },
};
</script>
