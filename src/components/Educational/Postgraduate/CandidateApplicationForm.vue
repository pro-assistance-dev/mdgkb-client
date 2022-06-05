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

      <UserForm :form="candidateApplication.formValue" :validate-email="false" />

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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ICandidateExam from '@/interfaces/ICandidateExam';
import ISpecialization from '@/interfaces/ISpecialization';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';
import Provider from '@/services/Provider';
import SpecializationsFiltersLib from '@/services/Provider/libs/filters/SpecializationsFiltersLib';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'CandidateApplicationForm',
  components: { FieldValuesForm, UserForm },
  emits: ['close'],

  setup(_, { emit }) {
    const mounted = ref(false);
    const candidateApplication: ComputedRef<ICandidateApplication> = computed<ICandidateApplication>(
      () => Provider.store.getters['candidateApplications/item']
    );
    const candidateExam: Ref<ICandidateExam> = computed<ICandidateExam>(() => Provider.store.getters['candidateExams/item']);
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const form = ref();
    const specializations: ComputedRef<ISpecialization[]> = computed<ISpecialization[]>(
      () => Provider.store.getters['specializations/items']
    );
    const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['candidateApplications/emailExists']);

    watch(isAuth, async () => {
      Provider.store.commit('candidateApplications/setUser', user.value);
    });

    const submit = async () => {
      if (emailExists.value) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: document.querySelector('#error-block-message')?.innerHTML || '',
        });
        scroll('#error-block-message');
        return;
      }
      candidateApplication.value.formValue.validate();
      if (!validate(form, true) || !candidateApplication.value.formValue.validated) {
        return;
      }
      candidateApplication.value.formValue.clearIds();
      await Provider.store.dispatch('candidateApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      Provider.resetFilterQuery();
      Provider.setFilterModels(SpecializationsFiltersLib.onlyPostgraduate());
      await Provider.getAll('specializations');
      Provider.store.commit('candidateApplications/resetItem');
      Provider.store.commit('candidateApplications/setFormValue', candidateExam.value.formPattern);
      candidateApplication.value.formValue.initFieldsValues();
      Provider.store.commit('candidateApplications/setExam', candidateExam.value);
      Provider.store.commit('candidateApplications/setUser', user.value);
      mounted.value = true;
    });

    return {
      specializations,
      candidateApplication,
      candidateExam,
      mounted,
      submit,
      user,
      isAuth,
      form,
      emailExists,
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
</style>
