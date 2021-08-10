<template>
  <el-card>
    <template #header><h3 style="text-align: center; margin: 0">Информация</h3></template>
    <el-form label-width="100px" :model="user">
      <el-form-item prop="email" label="Email">
        {{ user.email }}
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProfileInfoPage',
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
