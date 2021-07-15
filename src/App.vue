<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script lang="ts">
import MainLayout from '@/views/main/MainLayout.vue';
export default {
  name: 'App',
  components: {
    MainLayout,
  },
};
</script>
