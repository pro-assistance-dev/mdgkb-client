<template>
  <el-dialog
    v-model="authModalVisible"
    width="400px"
    :destroy-on-close="true"
    :title="
      loginStatus === 'login'
        ? 'Вход'
        : loginStatus === 'register'
        ? 'Регистрация'
        : loginStatus === 'forgotPassword'
        ? 'Восстановление пароля'
        : 'Задайте новый пароль'
    "
    center
    @closed="closeModal"
  >
    <el-form ref="myForm" label-width="0" :model="form" :rules="rules" @submit.prevent="submitForm">
      <el-form-item v-if="loginStatus === 'login' || loginStatus === 'register' || loginStatus === 'forgotPassword'" prop="email">
        <el-input v-model="form.email" placeholder="Email" type="email" @input="findEmail" />
      </el-form-item>

      <el-form-item v-if="loginStatus === 'login' || loginStatus === 'register' || loginStatus === 'passwordChange'" prop="password">
        <el-input v-model="form.password" placeholder="Пароль" type="password" />
      </el-form-item>

      <el-form-item style="text-align: center">
        <el-button type="primary" style="width: 60%" native-type="submit" @click.prevent="submitForm">
          {{
            loginStatus === 'login'
              ? 'Войти'
              : loginStatus === 'register'
              ? 'Зарегистрироваться'
              : loginStatus === 'forgotPassword'
              ? 'Отправить ссылку'
              : 'Сохранить'
          }}
        </el-button>
      </el-form-item>
      <el-form-item v-if="loginStatus === 'login'" class="reg-item" style="text-align: center">
        <el-button type="text" @click.prevent="setRegister"> Нет учетной записи? </el-button>
      </el-form-item>
      <el-form-item v-if="loginStatus === 'register'" class="reg-item" style="text-align: center">
        <el-button type="text" @click.prevent="setLogin"> Уже зарегистрированы? </el-button>
      </el-form-item>
      <el-form-item v-if="loginStatus === 'login'" class="reg-item" style="text-align: center">
        <el-button type="text" @click.prevent="setForgotPassword"> Забыли пароль? </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import User from '@/classes/User';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const form = ref(new User());
    const myForm = ref();

    const store = useStore();
    const closeModal = () => {
      store.commit('auth/closeModal');
      form.value = new User();
    };

    const route = useRoute();
    const router = useRouter();
    const setLogin = () => store.commit('auth/setLogin');
    const setRegister = () => store.commit('auth/setRegister');
    const setForgotPassword = () => store.commit('auth/setForgotPassword');
    const setPasswordChange = () => store.commit('auth/setPasswordChange');
    const authModalVisible = computed(() => store.getters['auth/authModalVisible']);
    const emailExists: Ref<boolean> = computed(() => store.getters['users/emailExists']);
    const loginStatus: Ref<'login' | 'register' | 'forgotPassword' | 'passwordChange'> = computed(() => store.getters['auth/loginStatus']);

    const emailRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
        return;
      }
      // await store.dispatch('users/findEmail', value);
      if (loginStatus.value === 'register' && value && emailExists.value) {
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
      if (!validate(myForm, true)) {
        return;
      }
      try {
        if (loginStatus.value === 'login') {
          await store.dispatch('auth/login', { email: form.value.email, password: form.value.password });
        } else if (loginStatus.value === 'register') {
          await store.dispatch('auth/register', form.value);
        } else if (loginStatus.value === 'forgotPassword') {
          await store.dispatch('auth/restorePassword', form.value);
          ElMessage({ message: 'Ссылка для восстановления пароля отправлена на Вашу почту', type: 'success' });
          closeModal();
          return;
        } else if (loginStatus.value === 'passwordChange') {
          await sendPassword();
          return;
        }
      } catch (error) {
        console.log(error);
        if (loginStatus.value === 'login' || loginStatus.value === 'register') {
          ElMessage({ message: 'Неверный логин или пароль', type: 'error' });
        } else if (loginStatus.value === 'passwordChange') {
          ElMessage({ message: 'Неверный пароль', type: 'error' });
        }
        return;
      }
      closeModal();
      ElMessage({ message: 'Вы успешно вошли в систему', type: 'success' });
    };

    const sendPassword = async () => {
      const userId = route.params['userId'];
      if (userId && typeof userId === 'string') {
        form.value.id = userId;
      }
      await store.dispatch('auth/refreshPassword', form.value);
      await router.push('/main');
      ElMessage({ message: 'Используйте новый пароль для входа в систему', type: 'success' });
      store.commit('auth/setLogin');
    };

    const findEmail = async (email: string) => {
      if (email.length < 3) {
        return;
      }
      await store.dispatch('users/findEmail', email);
    };

    return {
      findEmail,
      emailExists,
      form,
      submitForm,
      authModalVisible,
      closeModal,
      rules,
      myForm,
      loginStatus,
      setLogin,
      setRegister,
      setForgotPassword,
      setPasswordChange,
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

.reg-item {
  margin-bottom: 0;
}
</style>
