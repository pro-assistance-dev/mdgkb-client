<template>
  <div v-if="mounted" class="contact-form">
    <el-form ref="form" :model="vacancyResponse" label-position="top" :rules="rules">
      <UserForm
        :form="vacancyResponse.formValue"
        :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithAllUserFields()"
        @findEmail="findEmail"
      />
      <FieldValuesForm :form="vacancyResponse.formValue" />
      <el-divider />
      <div class="response-child">
        <button class="response btn" @click.prevent="submit()">Отправить форму</button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import UserFormFields from '@/classes/UserFormFields';
import VacancyResponse from '@/classes/VacancyResponse';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IVacancy from '@/interfaces/IVacancy';
import VacancyResponseRules from '@/rules/VacancyResponseRules';
import IUser from '@/services/interfaces/IUser';
import validate from '@/services/validate';

export default defineComponent({
  name: 'VacancyResponseForm',
  components: { UserForm, FieldValuesForm },
  emits: ['close'],

  setup(_, { emit }) {
    const filter = ref('');
    const store = useStore();
    const mounted = ref(false);
    const rules = ref(VacancyResponseRules);
    const form = ref();
    const vacancyResponse: ComputedRef<VacancyResponse> = computed(() => store.getters['vacancyResponses/item']);
    const vacancy: ComputedRef<IVacancy> = computed(() => store.getters['vacancies/item']);
    const user: ComputedRef<IUser> = computed(() => store.getters['auth/user']);

    const submit = async () => {
      vacancyResponse.value.formValue.validate();
      if (!validate(form, true) || !vacancyResponse.value.formValue.validated) {
        return;
      }
      vacancyResponse.value.formValue.clearIds();
      await store.dispatch('vacancyResponses/create', vacancyResponse.value);
      ElMessage({
        type: 'success',
        message: 'Форма успешно отправлена',
      });
      //  ElNotification({ title: 'Отклик на вакансию', message: 'Форма успешно отправлена', type: 'success' });
      emit('close');
    };

    onBeforeMount(async () => {
      store.commit('vacancyResponses/resetItem');
      store.commit('vacancyResponses/setFormValue', vacancy.value.formPattern);
      vacancyResponse.value.formValue.initFieldsValues();
      store.commit('vacancyResponses/setVacancy', vacancy.value);
      store.commit('vacancyResponses/setUser', user.value);

      mounted.value = true;
    });

    return {
      user,
      form,
      rules,
      mounted,
      submit,
      vacancyResponse,
      filter,
      UserFormFields,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-row {
  justify-content: left;
  display: block;
  flex-wrap: wrap;
  gap: 80px;
  width: 100%;
}

.justify-center {
  justify-content: center;
}
.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
:deep(.avatar-uploader-cover) {
  text-align: unset;
}

.mt-1 {
  margin-top: 10px;
}
.mb-1 {
  margin-bottom: 10px;
}

.form-block {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.flex-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
:deep(.el-date-editor.el-input) {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}

.response {
  background: #2754eb;
  border-radius: 40px;
  border: none;
  font-family: roboto;
  font-size: 1rem;
  color: #ffffff;
  margin-left: 5px;
  padding: 9px 18px;
  text-align: center;
  margin-right: 50px;
  &:hover {
    cursor: pointer;
    background-color: #133dcc;
  }
}

.response-child {
  display: flex;
  justify-content: right;
}

:deep(.el-form-item__label) {
  line-height: 20px;
}
</style>
