<template>
  <div v-if="mounted">
    <el-form ref="form" v-model="candidateApplication" :model="candidateApplication" label-position="top">
      <div style="margin-bottom: 10px">
        <h4>Выберете специализации для защиты</h4>
        <el-checkbox
          v-for="specialization in specializations"
          :key="specialization.id"
          :model-value="candidateApplication.findSpecialization(specialization.id)"
          @change="candidateApplication.addSpecialization(specialization)"
        >
          {{ specialization.name }}
        </el-checkbox>
      </div>

      <UserForm
        :form="candidateApplication.formValue"
        :validate-email="false"
        :active-fields="UserFormFields.CreateWithFullName({ userDateBirth: true })"
      />

      <i>
        <div>Печать документов должна быть высокого качества.</div>
        <div>При заполнении от руки – ПЕЧАТНЫМИ буквами.</div>
        <div>Не допускается исправление ошибок путем зачеркивания или с помощью корректирующих средств.</div>
        <div>
          Все копии должны быть заверены в отделе кадров организации оригинальной печатью либо нотариально (исключая документы работников
          МДГКБ).
        </div>
      </i>

      <FieldValuesForm :form="candidateApplication.formValue" />
    </el-form>
    <el-divider />
    <div style="text-align: right">
      <button class="response-btn" @click="submit">Отправить заявление</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';

import CandidateApplication from '@/classes/CandidateApplication';
import Specialization from '@/classes/Specialization';
import UserFormFields from '@/classes/UserFormFields';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import ICandidateExam from '@/interfaces/ICandidateExam';
import validate from '@/services/validate';

export default defineComponent({
  name: 'CandidateApplicationForm',
  components: { FieldValuesForm, UserForm },
  emits: ['close'],

  setup(_, { emit }) {
    const mounted = ref(false);
    const candidateApplication: CandidateApplication = CandidateApplicationsStore.Item();
    const candidateExam: ICandidateExam = CandidateExamsStore.Item();
    const form = ref();
    const specializations: Specialization[] = SpecializationsStore.Items();

    const submit = async () => {
      candidateApplication.formValue.validate();
      if (!validate(form, true) || !candidateApplication.formValue.validated) {
        return;
      }
      candidateApplication.formValue.clearIds();

      await CandidateApplicationsStore.Create();
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      await SpecializationsStore.GetAll();
      CandidateApplicationsStore.ResetItem();
      candidateApplication.formValue.initFieldsValues();
      mounted.value = true;
    });

    return {
      specializations,
      candidateApplication,
      candidateExam,
      mounted,
      submit,
      form,
      UserFormFields,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
</style>
