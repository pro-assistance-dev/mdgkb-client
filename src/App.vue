<template>
  <MainLayout />
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import MainLayout from '@/views/main/MainLayout.vue';

export default {
  name: 'App',
  components: {
    MainLayout,
  },
  setup() {
  },
};
</script>
