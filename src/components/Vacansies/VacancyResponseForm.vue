<template>
  <el-form>

    <div v-if="mounted" class="contact-form">
      <UserForm :form="vacancyResponse.formValue" :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithAllUserFields()" @findEmail="findEmail" />
      <FieldValuesForm :form="vacancyResponse.formValue" />
      <el-divider />
      <div class="response-child">
        <button class="response btn" @click.prevent="submit()">Отправить форму</button>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';

import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import Vacancy from '@/classes/Vacancy';
import VacancyResponse from '@/classes/VacancyResponse';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import VacancyResponseRules from '@/rules/VacancyResponseRules';
import validate from '@/services/validate';

const emits = defineEmits(['close'])

const filter = ref('');
const mounted = ref(false);
const rules = ref(VacancyResponseRules);
const form = ref();
const vacancyResponse: ComputedRef<VacancyResponse> = Store.Item('vacancyResponses')
const vacancy: ComputedRef<Vacancy> = Store.Item('vacancies')
const auth: ComputedRef<User> = Store.Getters('auth/auth')
const user = computed(() => auth.value.user.get())

const submit = async () => {
  vacancyResponse.value.formValue.validate();
  if (!validate(form, true) || !vacancyResponse.value.formValue.validated) {
    return;
  }
  vacancyResponse.value.formValue.clearIds();
  await Store.Create('vacancyResponses', vacancyResponse.value);
  ElMessage({
    type: 'success',
    message: 'Форма успешно отправлена',
  });
  //  ElNotification({ title: 'Отклик на вакансию', message: 'Форма успешно отправлена', type: 'success' });
  emits('close');
};

onBeforeMount(async () => {
  Store.Commit('vacancyResponses/resetItem');
  Store.Commit('vacancyResponses/setFormValue', vacancy.value.formPattern);
  vacancyResponse.value.formValue.initFieldsValues();
  Store.Commit('vacancyResponses/setVacancy', vacancy.value);
  Store.Commit('vacancyResponses/setUser', user.value);

  mounted.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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
