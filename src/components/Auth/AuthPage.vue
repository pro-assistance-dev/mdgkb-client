<template>
  <el-dialog
    width="400px"
    :destroy-on-close="true"
    v-model="authModalVisible"
    @closed="closeModal"
    :title="isLogin ? 'Вход' : 'Регистрация'"
    center
  >
    <el-form label-width="0" ref="myForm" :model="form" @submit.prevent="submitForm" :rules="rules">
      <el-form-item prop="email">
        <el-input placeholder="Email" v-model="form.email" type="email" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input placeholder="Пароль" v-model="form.password" type="password" />
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
import User from '@/classes/user/User';

export default defineComponent({
  name: 'AuthPage',
  methods: {
    forceUpdate() {
      this.$forceUpdate();
    },
  },
  async setup() {
    const form = ref(new User());
    const myForm = ref();

    const store = useStore();
    const closeModal = () => {
      store.commit('auth/closeModal');
      form.value = new User();
    };
    const toggleIsLogin = () => store.commit('auth/toggleIsLoginModal');
    const authModalVisible = computed(() => store.getters['auth/authModalVisible']);
    const emailExist = computed(() => store.getters['users/emailExist']);
    const isLogin = computed(() => store.getters['auth/isLoginModal']);

    const emailRule = async (rule: any, value: any, callback: any) => {
      if (!isLogin.value && value) {
        await store.dispatch('users/findEmail', value);
      }
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
      } else if (!isLogin.value && value && emailExist.value) {
        callback(new Error('Ведённый email уже существует'));
      }
      callback();
      return;
    };
    const passwordRule = async (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('Необходимо ввести пароль'));
      } else if (value.length < 6) {
        callback(new Error('Пароль должен быть не менее 6 символов'));
      }
      callback();
      return;
    };
    const rules = ref({
      email: [
        { required: true, validator: emailRule, trigger: 'blur' },
        { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' },
      ],
      password: [{ required: true, validator: passwordRule, trigger: 'blur' }],
    });

    const submitForm = async (): Promise<void> => {
      let validationResult;
      myForm.value.validate((valid: any) => {
        if (valid) {
          console.log('valid true', valid);
          validationResult = true;
          console.log('check validationResult 92', validationResult);
        } else {
          console.log('valid false', valid);
          validationResult = false;
          console.log('check validationResult 96', validationResult);
        }
      });
      if (!validationResult) {
        console.log('check validationResult 100', validationResult);
        return;
      }
      try {
        if (isLogin.value) {
          await store.dispatch('auth/login', { email: form.value.email, password: form.value.password });
        } else {
          await store.dispatch('auth/register', { email: form.value.email, password: form.value.password });
        }
      } catch (error) {
        ElMessage({ message: 'Неверный логин или пароль', type: 'error' });
        return;
      }
      closeModal();
    };

    return {
      emailExist,
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
