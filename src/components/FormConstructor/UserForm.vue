<template>
  <div v-if="showErrorMessage & emailExists & !isAuth" class="error-block-message">
    Заявка с указанным адресом электронной почты уже зарегистрирована. Для просмотра данных по заявке, пожалуйста,
    <a @click="openLoginModal"> авторизируйтесь</a> и перейдите в личный кабинет.
  </div>
  <div v-else-if="showErrorMessage & emailExists & isAuth" class="error-block-message">
    Вы уже подавали заявку на данную программу. Для просмотра данных по заявке, пожалуйста, перейдите в
    <a @click="$router.push('/profile')"> личный кабинет</a>.
  </div>
  <el-form-item v-if="!user.email || fromAdmin" label="Электронная почта" prop="formValue.user.email" :rules="rules.email">
    <el-input v-model="formValue.user.email" placeholder="Электронная почта" @input="findEmail"></el-input>
  </el-form-item>
  <el-form-item v-if="!user.human.surname || fromAdmin" label="Фамилия" prop="formValue.user.human.surname">
    <el-input v-model="formValue.user.human.surname" placeholder="Фамилия"></el-input>
  </el-form-item>
  <el-form-item v-if="!user.human.name || fromAdmin" label="Имя" prop="formValue.user.human.name">
    <el-input v-model="formValue.user.human.name" placeholder="Имя"></el-input>
  </el-form-item>
  <el-form-item v-if="!user.human.patronymic || fromAdmin" label="Отчество" prop="formValue.user.human.patronymic">
    <el-input v-model="formValue.user.human.patronymic" placeholder="Отчество"></el-input>
  </el-form-item>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'UserForm',
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
    emailExists: {
      type: Boolean,
      default: false,
    },
    validateEmail: {
      type: Boolean,
      default: true,
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    fromAdmin: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['findEmail'],

  setup(props, { emit }) {
    const store = useStore();
    const isAuth: ComputedRef<boolean> = computed(() => store.getters['auth/isAuth']);
    const user: ComputedRef<IUser> = computed(() => store.getters['auth/user']);
    const formValue: Ref<IForm | undefined> = ref();

    const emailRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
        return;
      }
      // await store.dispatch('users/findEmail', value);
      if (value && props.emailExists) {
        callback(new Error('Ведённый email уже существует'));
      }
      callback();
      return;
    };
    const rules = {
      email: [
        { required: true, validator: emailRule, trigger: 'blur' },
        { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' },
      ],
    };
    const openLoginModal = () => {
      store.commit('auth/openModal', 'login');
    };

    const findEmail = () => {
      if (props.validateEmail) emit('findEmail');
    };

    onBeforeMount(() => {
      formValue.value = props.form;
    });

    return {
      rules,
      isAuth,
      user,
      openLoginModal,
      formValue,
      findEmail,
    };
  },
});
</script>

<style lang="scss" scoped>
.error-block-message {
  font-size: 14px;
  // max-width: 350px;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  color: #f56c6c;
  border: 1px solid #f56c6c;
  background-color: lighten(#f56c6c, 25%);
}
</style>
