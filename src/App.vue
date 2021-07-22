<template>
  <Suspense>
    <MainLayout>
      <router-view />
    </MainLayout>
  </Suspense>
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
