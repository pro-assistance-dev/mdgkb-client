<template>
  <el-card class="card-content">
    <template #header>
      <div class="card-header">
        <h1 class="title article-title">{{ isLogin ? 'Вход' : 'Регистрация' }}</h1>
      </div>
    </template>

    <el-form label-position="right" label-width="100px" :model="form" @submit.prevent="submitForm">
      <el-form-item label="Email">
        <el-input v-model="form.email" type="email" />
      </el-form-item>

      <el-form-item label="Пароль" type="password">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" @click="submitForm">
          {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
        </el-button>
        <el-button type="text" @click.prevent="toggleIsLogin">
          {{ isLogin ? 'Нет учётной записи? Зарегистрируйтесь!' : 'Уже зарегистрированы? Войдите!' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
  async setup(props) {
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
      await router.push('/news');
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

<style scoped lang="scss">
.card-content {
  width: 60%;
  margin: 50px auto 65px auto;
}
.card-header {
  text-align: center;
}
</style>
