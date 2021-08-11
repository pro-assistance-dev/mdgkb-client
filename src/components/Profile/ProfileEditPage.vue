<template>
  <el-card>
    <template #header><h3 style="text-align: center; margin: 0">Профиль</h3></template>
    <el-form label-width="100px" :model="user">
      <el-form-item prop="email" label="Email">
        <el-input v-model="user.email" placeholder="Email" type="email" />
      </el-form-item>

      <el-form-item prop="password" label="Пароль">
        <el-input v-model="user.password" placeholder="Пароль" type="password" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProfileEditPage',
  setup() {
    const store = useStore();

    const userId = localStorage.getItem('userId');
    const user = computed(() => store.getters['users/user']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId);
    };
    onMounted(loadUser);

    return {
      user,
    };
  },
});
</script>

<style scoped lang="scss"></style>
