<template>
  <el-dialog width="400px" v-model="authModalVisible" @closed="closeModal" :title="isLogin ? 'Вход' : 'Регистрация'" center>
    <el-form label-width="0" ref="myForm" :model="form" @submit.prevent="submitForm" :rules="rules">
      <el-form-item prop="email">
        <el-input placeholder="Email" v-model="form.email" type="email" />
      </el-form-item>

      <el-form-item type="password" prop="password">
        <el-input placeholder="Пароль" v-model="form.password" />
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" style="width: 60%" native-type="submit" @click.prevent="submitForm">
          {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
        </el-button>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="text" @click.prevent="toggleIsLogin">
          {{ isLogin ? 'Нет учётной записи?' : 'Уже зарегистрированы?' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'AuthPage',
  async setup() {
    const form = ref({
      email: '',
      password: '',
    });
    const myForm = ref();

    const store = useStore();
    const closeModal = () => store.commit('auth/closeModal');
    const toggleIsLogin = () => store.commit('auth/toggleIsLoginModal');
    const authModalVisible = computed(() => store.getters['auth/authModalVisible']);
    const isLogin = computed(() => store.getters['auth/isLoginModal']);

    const rules = {
      email: [{ required: true, message: 'Необходимо указать email', trigger: 'blur' }],
      password: [{ required: true, message: 'Необходимо ввести пароль', trigger: 'blur' }],
    };

    const submitForm = async (): Promise<void> => {
      let validationResult;
      myForm.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
      });
      if (!validationResult) return;

      try {
        if (isLogin.value) {
          await store.dispatch('auth/login', { email: form.value.email, password: form.value.password });
          console.log('check login');
        } else {
          await store.dispatch('auth/register', { email: form.value.email, password: form.value.password });
          console.log('check register');
        }
      } catch (error) {
        ElMessage({ message: 'Неверный логин или пароль', type: 'error' });
        return;
      }
      closeModal();
    };

    return {
      form,
      submitForm,
      toggleIsLogin,
      authModalVisible,
      closeModal,
      isLogin,
      rules,
      myForm,
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
