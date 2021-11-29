<template>
  <el-card v-if="user">
    <template #header><h3 style="text-align: center; margin: 0">Профиль</h3></template>
    <el-form label-width="100px" :model="user">
      <HumanForm :store-module="'users'" />

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
import { computed, defineComponent, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';

import HumanForm from '@/components/admin/HumanForm.vue';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ProfileEditPage',
  components: { HumanForm },
  setup() {
    const store = useStore();

    const userId = localStorage.getItem('userId');
    const user: Ref<IUser> = computed(() => store.getters['users/item']);

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
