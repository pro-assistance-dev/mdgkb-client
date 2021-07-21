<template>
  <el-container direction="vertical">
    <h1>{{ isLogin ? 'Вход' : 'Регистрация' }}</h1>
    <el-card>
      <el-form label-position="right" label-width="100px" :model="form" @submit.prevent="submitForm">
        <el-form-item label="Email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>

        <el-form-item label="Пароль" type="password">
          <el-input v-model="form.password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" @click.prevent="submitForm">
            {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
          </el-button>
          <el-button type="text" @click.prevent="toggleIsLogin">
            {{ isLogin ? 'Нет учётной записи? Зарегистрируйтесь!' : 'Уже зарегистрированы? Войдите!' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AuthPage',
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const form = ref({
      email: '',
      password: '',
    });

    const store = useStore();
    const router = useRouter();

    const submitForm = async (): Promise<void> => {
      if (props.isLogin) {
        await store.dispatch('auth/login', { email: form.value.email, password: form.value.password });
      } else {
        await store.dispatch('auth/register', { email: form.value.email, password: form.value.password });
      }

      await router.push('/');
    };

    const toggleIsLogin = async (): Promise<void> => {
      if (props.isLogin) {
        await router.push('/register');
      } else {
        await router.push('/login');
      }
    };

    return {
      form,
      submitForm,
      toggleIsLogin,
    };
  },
});
</script>
