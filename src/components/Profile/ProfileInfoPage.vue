<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Информация</h3></template>
    <el-form label-width="100px" :model="user" label-position="left">
      <el-form-item prop="email" label="Email">
        {{ user.email }}
      </el-form-item>
      <el-form-item v-if="user.human.name" label="Имя">
        {{ user.human.name }}
      </el-form-item>
      <el-form-item v-if="user.human.surname" label="Фамилия">
        {{ user.human.surname }}
      </el-form-item>
      <el-form-item v-if="user.human.patronymic" label="Отчество">
        {{ user.human.patronymic }}
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ProfileInfoPage',
  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => store.getters['users/item']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      mounted.value = true;
    };
    onMounted(loadUser);

    return {
      mounted,
      user,
    };
  },
});
</script>

<style scoped lang="scss"></style>
