<template>
  <el-row :gutter="40">
    {{ user }}
  </el-row>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProfilePage',
  async setup() {
    const store = useStore();

    const userId = localStorage.getItem('userId');
    await store.dispatch('users/get', userId);
    const user = store.getters['users/user'];
    return {
      user,
    };
  },
});
</script>

<style scoped lang="scss"></style>
