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

export default defineComponent({
  name: 'ProfileEditPage',
  async setup() {
    const store = useStore();

    const userId = localStorage.getItem('userId');
    await store.dispatch('users/get', userId);
    const user = store.getters['users/user'];
    const emailExist = computed(() => store.getters['users/emailExist']);

    const emailRule = async (rule: any, value: any, callback: any) => {
      await store.dispatch('users/findEmail', value);
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
      } else if (value && emailExist.value) {
        callback(new Error('Ведённый email уже существует'));
      }
    };
    const rules = ref({
      email: [
        { required: true, validator: emailRule, trigger: 'blur' },
        { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Необходимо ввести пароль', trigger: 'blur' },
        { min: 6, message: 'Пароль должен быть не менее 6 символов' },
      ],
    });

    return {
      user,
      rules,
    };
  },
});
</script>

<style scoped lang="scss"></style>
