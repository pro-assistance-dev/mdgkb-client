<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="dpoApplication" :model="dpoApplication" label-position="top">
      <div v-if="emailExists & !isAuth" class="error-block-message">
        Заявка с указанным адресом электронной почты уже зарегистрирована. Для просмотра данных по заявке, пожалуйста,
        <a @click="openLoginModal"> авторизируйтесь</a> и перейдите в личный кабинет.
      </div>
      <div v-else-if="emailExists & isAuth" class="error-block-message">
        Вы уже подавали заявку на данную программу. Для просмотра данных по заявке, пожалуйста, перейдите в
        <a> личный кабинет</a>.
      </div>
      <el-form-item v-if="!user.email" label="Электронная почта" prop="user.email" :rules="rules.email">
        <el-input v-model="dpoApplication.user.email" placeholder="Электронная почта" @input="findEmail"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.surname" label="Фамилия" prop="user.human.surname">
        <el-input v-model="dpoApplication.user.human.surname" placeholder="Фамилия"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.name" label="Имя" prop="user.human.name">
        <el-input v-model="dpoApplication.user.human.name" placeholder="Имя"></el-input>
      </el-form-item>
      <el-form-item v-if="!user.human.patronymic" label="Отчество" prop="user.human.patronymic">
        <el-input v-model="dpoApplication.user.human.patronymic" placeholder="Отчество"></el-input>
      </el-form-item>

      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая документы работников
          МДГКБ).
        </div>
      </i>

      <FieldValuesForm :form="dpoCourse.formPattern" />
    </el-form>
    <el-divider />
    <div style="text-align: right">
      <button class="response-btn" @click="submit">Отправить заявление</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'DpoApplicationForm',
  components: { FieldValuesForm },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const mounted = ref(false);
    const dpoApplication: ComputedRef<IDpoApplication> = computed<IDpoApplication>(() => store.getters['dpoApplications/item']);
    const dpoCourse: ComputedRef<IDpoCourse> = computed<IDpoCourse>(() => store.getters['dpoCourses/item']);
    const user: ComputedRef<IUser> = computed(() => store.getters['auth/user']);
    const isAuth: ComputedRef<boolean> = computed(() => store.getters['auth/isAuth']);
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['dpoApplications/emailExists']);
    const form = ref();

    const emailRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
        return;
      }
      // await store.dispatch('users/findEmail', value);
      if (value && emailExists.value) {
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

    watch(isAuth, async () => {
      store.commit('dpoApplications/setUser', user.value);
      await store.dispatch('dpoApplications/emailExists', dpoCourse.value.id);
    });

    const findEmail = async () => {
      await store.dispatch('dpoApplications/emailExists', dpoCourse.value.id);
    };
    const openLoginModal = () => {
      store.commit('auth/openModal', 'login');
    };

    const submit = async () => {
      dpoCourse.value.formPattern.validate();
      if (!validate(form, true) || !dpoCourse.value.formPattern.validated) {
        return;
      }
      store.commit('dpoApplications/setFieldValues', dpoCourse.value.formPattern);
      await store.dispatch('dpoApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      await store.dispatch('dpoApplications/emailExists', dpoCourse.value.id);
      store.commit('dpoApplications/resetItem');
      dpoCourse.value.formPattern.initFieldsValues();
      // dpoApplication.value.initFieldsValues(dpoCourse.value.formPattern.fields);
      store.commit('dpoApplications/setCourse', dpoCourse.value);
      store.commit('dpoApplications/setUser', user.value);
      mounted.value = true;
    });

    return {
      dpoApplication,
      dpoCourse,
      mounted,
      submit,
      user,
      isAuth,
      form,
      findEmail,
      rules,
      emailExists,
      openLoginModal,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  line-height: 1.2;
}
//:deep(a) {
//  color: blue !important;
//}

a {
  color: #2754eb;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: darken(#2754eb, 30%);
  }
}
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
