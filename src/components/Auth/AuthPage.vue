<template>
  <el-dialog
    v-model="authModalVisible"
    width="400px"
    :destroy-on-close="true"
    :title="isLogin ? 'Вход' : 'Регистрация'"
    center
    @closed="closeModal"
  >
    <el-form ref="myForm" label-width="0" :model="form" :rules="rules" @submit.prevent="submitForm">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="Email" type="email" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="Пароль" type="password" />
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
import { ElMessage } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import User from '@/classes/user/User';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import validate from '@/mixinsAsModules/validate';

export default defineComponent({
  name: 'AuthPage',
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
    const email = computed(() => store.getters['users/authPageEmail']);
    const isLogin = computed(() => store.getters['auth/isLoginModal']);

    const emailRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!isLogin.value && value && value !== email.value) {
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
    const passwordRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
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
      if (!validate(myForm)) return;
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
  methods: {
    forceUpdate() {
      this.$forceUpdate();
    },
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
