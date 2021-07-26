<template>
  <el-card>
    <template #header><h3 style="text-align: center; margin: 0">Профиль</h3></template>
    <el-form label-width="100px" :model="user" :rules="rules">
      <el-form-item prop="email" label="Email">
        <el-input placeholder="Email" v-model="user.email" type="email" />
      </el-form-item>

      <el-form-item prop="password" label="Пароль">
        <el-input placeholder="Пароль" v-model="user.password" type="password" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent, ref } from 'vue';
import UserRules from '@/classes/user/UserRules';

export default defineComponent({
  name: 'ProfileEditPage',
  async setup() {
    const store = useStore();

    const userId = localStorage.getItem('userId');
    await store.dispatch('users/get', userId);
    const user = store.getters['users/user'];

    const rules = ref(UserRules);

    return {
      user,
      rules,
    };
  },
});
</script>

<style scoped lang="scss"></style>
