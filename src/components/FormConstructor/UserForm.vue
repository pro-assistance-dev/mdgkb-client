<template>
  <div v-if="showErrorMessage && emailExists && !isAuth" id="error-block-message" class="error-block-message">
    Заявка с указанным адресом электронной почты уже зарегистрирована. Для просмотра данных по заявке, пожалуйста,
    <a @click="openLoginModal"> авторизируйтесь</a> и перейдите в личный кабинет.
  </div>
  <div v-else-if="showErrorMessage && emailExists && isAuth" id="error-block-message" class="error-block-message">
    Вы уже подавали заявку. Для просмотра данных, пожалуйста, перейдите в
    <a @click="$router.push('/profile')"> личный кабинет</a>.
  </div>
  <el-form-item
    v-if="(!user.email || fromAdmin) && activeFields.userEmail"
    label="Электронная почта"
    prop="formValue.user.email"
    :rules="rules.email"
  >
    <el-input v-model="formValue.user.email" placeholder="Электронная почта" @input="findEmail"></el-input>
  </el-form-item>
  <el-form-item
    v-if="(!user.human.surname || fromAdmin) && activeFields.userSurname"
    label="Фамилия"
    prop="formValue.user.human.surname"
    :rules="rules.userSurname"
  >
    <el-input v-model="formValue.user.human.surname" placeholder="Фамилия"></el-input>
  </el-form-item>
  <el-form-item
    v-if="(!user.human.name || fromAdmin) && activeFields.userName"
    :rules="rules.userName"
    label="Имя"
    prop="formValue.user.human.name"
  >
    <el-input v-model="formValue.user.human.name" placeholder="Имя"></el-input>
  </el-form-item>
  <el-form-item
    v-if="(!user.human.patronymic || fromAdmin) && activeFields.userPatronymic"
    :rules="rules.userPatronymic"
    label="Отчество"
    prop="formValue.user.human.patronymic"
  >
    <el-input v-model="formValue.user.human.patronymic" placeholder="Отчество"></el-input>
  </el-form-item>
  <el-form-item
    v-if="(!user.human.patronymic || fromAdmin) && activeFields.userPostIndex"
    label="Почтовый индекс"
    :rules="rules.userPostIndex"
    prop="formValue.user.human.postIndex"
  >
    <el-input v-model="formValue.user.human.postIndex" placeholder="Почтовый индекс"></el-input>
  </el-form-item>
  <el-form-item
    v-if="(!user.human.patronymic || fromAdmin) && activeFields.userAddress"
    label="Адрес"
    prop="formValue.user.human.address"
    :rules="rules.userAddress"
  >
    <el-input v-model="formValue.user.human.address" placeholder="Адрес"></el-input>
  </el-form-item>
  <el-form-item
    v-if="(!user.human.snils || fromAdmin) && activeFields.userSnils"
    :rules="rules.userSnils"
    label="СНИЛС"
    prop="formValue.user.human.snils"
  >
    <el-input v-model="formValue.user.human.snils" placeholder="СНИЛС"></el-input>
  </el-form-item>
  <el-form-item v-if="activeFields.userDateBirth" :rules="rules.userDateBirth" label="Дата рождения" prop="formValue.user.human.dateBirth">
    <DatePicker v-model="formValue.user.human.dateBirth" />
  </el-form-item>
  <el-form-item v-if="activeFields.userIsMale" :rules="rules.userIsMale" label="Пол" prop="formValue.user.human.isMale">
    <el-select v-model="formValue.user.human.isMale" placeholder="Выберите пол">
      <el-option label="Мужской" :value="true"></el-option>
      <el-option label="Женский" :value="false"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item v-if="activeFields.userPhone" :rules="rules.userPhone" label="Ваш телефон:" prop="formValue.user.phone">
    <el-input
      v-model="formValue.user.phone"
      placeholder="+7(___) ___ __ __"
      @input="(e) => (formValue.user.phone = PhoneService.Format(e))"
    ></el-input>
  </el-form-item>
  <el-form-item v-if="activeFields.childSurname" :rules="rules.childSurname" label="Фамилия пациента" prop="formValue.child.human.surname">
    <el-input v-model="formValue.child.human.surname" placeholder="Фамилия пациента"></el-input>
  </el-form-item>
  <el-form-item v-if="activeFields.childName" :rules="rules.childName" label="Имя пациента" prop="formValue.child.human.name">
    <el-input v-model="formValue.child.human.name" placeholder="Имя пациента"></el-input>
  </el-form-item>
  <el-form-item
    v-if="activeFields.childPatronymic"
    :rules="rules.childPatronymic"
    label="Отчество пациента"
    prop="formValue.child.human.patronymic"
  >
    <el-input v-model="formValue.child.human.patronymic" placeholder="Отчество пациента"></el-input>
  </el-form-item>
  <el-form-item
    v-if="activeFields.childDateBirth"
    :rules="rules.childDateBirth"
    label="Дата рождения пациента"
    prop="formValue.child.human.dateBirth"
  >
    <DatePicker v-model="formValue.child.human.dateBirth" />
  </el-form-item>
  <el-form-item
    v-if="activeFields.childCitizenship"
    label="Гражданство пациента"
    prop="formValue.child.human.citizenship"
    :rules="rules.userCitizenship"
  >
    <el-input v-model="formValue.child.human.citizenship" placeholder="Гражданство пациента"></el-input>
  </el-form-item>
  <el-form-item
    v-if="activeFields.userPlaceBirth"
    label="Место рождения"
    prop="formValue.user.human.placeBirth"
    :rules="rules.userPlaceBirth"
  >
    <el-input v-model="formValue.user.human.placeBirth" placeholder="Место рождения"></el-input>
  </el-form-item>
  <el-form-item
    v-if="activeFields.userCitizenship"
    label="Гражданство"
    prop="formValue.user.human.citizenship"
    :rules="rules.userCitizenship"
  >
    <el-input v-model="formValue.user.human.citizenship" placeholder="Гражданство"></el-input>
  </el-form-item>
  <el-form-item v-if="activeFields.childIsMale" :rules="rules.childIsMale" label="Пол пациента" prop="formValue.child.human.isMale">
    <el-select v-model="formValue.child.human.isMale" placeholder="Выберите пол">
      <el-option label="Мужской" :value="true"></el-option>
      <el-option label="Женский" :value="false"></el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Form from '@/classes/Form';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import DatePicker from '@/components/DatePicker.vue';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IUserFormFields from '@/interfaces/IUserFormFields';
import PhoneService from '@/services/PhoneService';

export default defineComponent({
  name: 'UserForm',
  components: { DatePicker },
  props: {
    form: {
      type: Object as PropType<Form>,
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
    activeFields: {
      type: Object as PropType<IUserFormFields>,
      default: UserFormFields.CreateWithFullName(),
    },
  },
  emits: ['findEmail'],

  setup(props, { emit }) {
    const store = useStore();
    const isAuth: ComputedRef<boolean> = computed(() => store.getters['auth/isAuth']);
    const user: ComputedRef<User> = computed(() => store.getters['auth/user']);
    const formValue = ref(new Form());

    const emailRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
        return;
      }
      await store.dispatch('users/findEmail', value);
      if (value && props.emailExists && props.validateEmail) {
        callback(new Error('Ведённый email уже существует'));
      }
      callback();
      return;
    };

    const rules = {
      email: [
        { validator: emailRule, trigger: 'blur' },
        { required: true, validator: emailRule, trigger: 'blur' },
        { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' },
      ],
      userSurname: [{ required: true, message: 'Пожалуйста, укажите вашу фамилию', trigger: 'blur' }],
      userName: [{ required: true, message: 'Пожалуйста, укажите ваше имя', trigger: 'blur' }],
      userPatronymic: [{ required: true, message: 'Пожалуйста, укажите ваше отчество', trigger: 'blur' }],
      userIsMale: [{ required: true, message: 'Пожалуйста, выберите ваш пол', trigger: 'change' }],
      userDateBirth: [{ required: true, message: 'Пожалуйста, укажите вашу дату рождения', trigger: 'change' }],
      userSnils: [{ required: true, message: 'Пожалуйста, укажите СНИЛС', trigger: 'blur' }],
      userPhone: [
        { required: true, message: 'Пожалуйста, укажите телефон', trigger: 'blur' },
        { required: true, validator: PhoneService.validatePhone, trigger: 'blur' },
      ],
      userCitizenship: [{ required: true, message: 'Пожалуйста, укажите своё гражданство', trigger: 'change' }],
      userPlaceBirth: [{ required: true, message: 'Пожалуйста, укажите своё место рождения', trigger: 'change' }],
      userPostIndex: [{ required: true, message: 'Пожалуйста, укажите почтовый индекс', trigger: 'change' }],
      userAddress: [{ required: true, message: 'Пожалуйста, укажите свой адрес', trigger: 'change' }],
      //
      childSurname: [{ required: true, message: 'Пожалуйста, укажите фамилию пациента', trigger: 'blur' }],
      childName: [{ required: true, message: 'Пожалуйста, укажите имя пациента', trigger: 'blur' }],
      childPatronymic: [{ required: true, message: 'Пожалуйста, укажите отчество пациента', trigger: 'blur' }],
      childIsMale: [{ required: true, message: 'Пожалуйста, выберите пол пациента', trigger: 'change' }],
      childDateBirth: [{ required: true, message: 'Пожалуйста, укажите дату рождения пациента', trigger: 'change' }],
    };
    const openLoginModal = () => {
      store.commit('auth/openModal', 'login');
    };

    const findEmail = () => {
      if (props.validateEmail) emit('findEmail');
    };
    onBeforeMount(() => {
      store.commit('auth/showWarning', true);
      store.commit('auth/authOnly', true);
      formValue.value = props.form;
      if (!isAuth.value) {
        openLoginModal();
      }
    });

    onBeforeUnmount(() => {
      store.commit('auth/showWarning', false);
      store.commit('auth/authOnly', false);
    });

    return {
      PhoneService,
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
:deep(.el-form-item__content) {
  min-width: 200px;
}
:deep(.el-form-item__label) {
  margin-left: 10px;
  // line-height: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
