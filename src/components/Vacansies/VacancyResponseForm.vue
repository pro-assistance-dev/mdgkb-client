<template>
  <el-form>
    <div v-if="mounted" class="contact-form">
      <UserForm
        :form="vacancyResponse.formValue"
        :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithAllUserFields()"
        @find-email="findEmail"
      />
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

import UserFormFields from '@/classes/UserFormFields';
import Vacancy from '@/classes/Vacancy';
import VacancyResponse from '@/classes/VacancyResponse';
import validate from '@/services/validate';

const emits = defineEmits(['close']);

const mounted = ref(false);
const form = ref();
const vacancyResponse: VacancyResponse = VacancyResponsesStore.Item();
const vacancy: Vacancy = VacanciesStore.Item();

const submit = async () => {
  vacancyResponse.formValue.validate();
  if (!validate(form, true) || !vacancyResponse.formValue.validated) {
    return;
  }
  vacancyResponse.formValue.clearIds();
  await VacancyResponsesStore.Create(vacancyResponse);
  ElMessage({
    type: 'success',
    message: 'Форма успешно отправлена',
  });
  //  ElNotification({ title: 'Отклик на вакансию', message: 'Форма успешно отправлена', type: 'success' });
  emits('close');
};

onBeforeMount(async () => {
  VacancyResponsesStore.ResetItem();
  VacancyResponsesStore.SetFormValue(vacancy.formPattern);
  vacancyResponse.formValue.initFieldsValues();
  VacancyResponsesStore.SetVacancy(vacancy);
  VacancyResponsesStore.SetUser(PHelp.Auth.GetUser());

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
