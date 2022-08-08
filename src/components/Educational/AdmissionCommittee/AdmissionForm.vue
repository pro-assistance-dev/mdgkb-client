<template>
  <div v-if="mounted">
    <el-steps :active="activeStep" finish-status="success">
      <el-step v-for="(step, i) in steps" :key="step" :class="{ 'success-step': activeStep > i }" :title="step" @click="toStep(i)" />
    </el-steps>

    <el-form
      id="admission-course-form"
      ref="userForm"
      v-model="residencyApplication"
      style="max-width: 700px; margin: 0 auto"
      :model="residencyApplication"
      label-width="150px"
    >
      <UserForm
        v-if="activeStep === 0"
        :form="residencyApplication.formValue"
        :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithAllUserFields()"
        @findEmail="findEmail"
      />
    </el-form>
    <el-form
      ref="questionsForm"
      v-model="residencyApplication"
      :model="residencyApplication"
      label-position="top"
      style="max-width: 700px; margin: 0 auto"
    >
      <AdmissionQuestionsForm v-if="activeStep === 1" :residency-application="residencyApplication" @all-questions-answered="submitStep" />
    </el-form>
    <el-form ref="achievementsForm" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <ResidencyApplicationAchievements v-if="activeStep === 2" :residency-application="residencyApplication" />
    </el-form>
    <el-form style="max-width: 700px; margin: 0 auto" label-width="150px">
      <FieldValuesForm v-if="activeStep === 3" :form="residencyApplication.formValue" :leave-fields-with-code="textFields" />
    </el-form>
    <el-form style="max-width: 700px; margin: 0 auto" label-position="top">
      <FieldValuesForm
        v-if="activeStep === 4"
        :form="residencyApplication.formValue"
        :filter-fields-with-code="textFieldsAndDocuments"
        :show-additional-files="true"
      />
    </el-form>

    <div class="navigate-buttons">
      <button :disabled="buttonOff" class="forward-btn" @click="submitStep">
        <span>{{ getButtonName() }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';

import ResidencyApplication from '@/classes/ResidencyApplication';
import UserFormFields from '@/classes/UserFormFields';
import AdmissionQuestionsForm from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsForm.vue';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';
import Provider from '@/services/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'AdmissionForm',
  components: { FieldValuesForm, UserForm, ResidencyApplicationAchievements, AdmissionQuestionsForm },
  emits: ['close'],
  setup(_, { emit }) {
    const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['residencyApplications/emailExists']);
    const mounted = ref(false);
    const activeStep: Ref<number> = ref(0);
    const residencyApplication: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );
    const textFields = ['DiplomaNumber', 'DiplomaSeries', 'DiplomaDate', 'UniversityEndYear', 'UniversityName', 'DiplomaSpeciality'];
    const textFieldsAndDocuments = [
      'DiplomaNumber',
      'DiplomaSeries',
      'DiplomaDate',
      'UniversityEndYear',
      'UniversityName',
      'DiplomaSpeciality',
      'ContractDzm',
    ];
    const steps = [
      'Заполните личные данные',
      'Ответьте на вопросы',
      'Укажите индивидуальные достижения',
      'Данные об образовании',
      'Загрузите пакет документов',
    ];

    const buttonOff: Ref<boolean> = ref(false);

    const residencyCourse: Ref<IResidencyCourse> = computed<IResidencyCourse>(() => Provider.store.getters['residencyCourses/item']);
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const form = ref();
    const userForm = ref();
    const questionsForm = ref();
    const achievementsForm = ref();

    watch(isAuth, async () => {
      Provider.store.commit('residencyApplications/setUser', user.value);
      await findEmail();
    });

    const findEmail = async () => {
      await Provider.store.dispatch('residencyApplications/emailExists', residencyCourse.value.id);
    };

    const submit = async () => {
      if (emailExists.value) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: document.querySelector('#error-block-message')?.innerHTML || '',
        });
        scroll('#responce-form');
        return;
      }
      residencyApplication.value.formValue.clearIds();
      await Provider.store.dispatch('residencyApplications/create');
      ElNotification.success('Заявка успешно отправлена');
      emit('close');
      clearAllValidate();
      await Provider.router.push('/admission-committee');
    };

    onBeforeMount(async () => {
      Provider.store.commit('residencyApplications/resetItem');
      Provider.store.commit('residencyApplications/setFormValue', residencyCourse.value.formPattern);
      residencyApplication.value.formValue.initFieldsValues();
      Provider.store.commit('residencyApplications/setAdmissionCommittee', true);
      Provider.store.commit('residencyApplications/setCourse', residencyCourse.value);
      Provider.store.commit('residencyApplications/setUser', user.value);

      await findEmail();
      mounted.value = true;
    });

    const filledApplicationDownload = () => {
      ElMessageBox.alert(
        'Заполните данные, скачайте и распечатайте заявление,  проверьте заполненные данные, при наличии ошибок исправьте на сайте и заново распечатайте форму, заполните недостающую информацию (печатными буквами, синей ручкой), поставьте подписи в заявлении, внесите данные документа удостоверяющего личность (в соответствующую графу), поставьте финальную подпись. Отсканируйте заявление и загрузите его',
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          confirmButtonText: 'OK',
          callback: () => {
            const form = new ResidencyApplication(residencyApplication.value);

            Provider.store.dispatch('residencyApplications/filledApplicationDownload', form);
            scroll('#responce-form');
            return;
          },
        }
      );
      return;
    };

    const clearAllValidate = (): void => {
      userForm.value.clearValidate();
      questionsForm.value.clearValidate();
      residencyApplication.value.formValue.clearValidate();
    };

    const submitStep = async () => {
      if (activeStep.value === 0 && !validate(userForm)) {
        return;
      }
      if (activeStep.value === 1 && !validate(questionsForm)) {
        return;
      }
      if (activeStep.value === 2 && !residencyApplication.value.validateAchievementsPoints()) {
        ElMessage({
          type: 'error',
          message: 'Необходимо добавить все файлы',
        });
        return;
      }
      residencyApplication.value.formValue.validate(true);
      if (activeStep.value === 3 && !residencyApplication.value.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: residencyApplication.value.formValue.getErrorMessage(),
        });
        return;
      }
      if (activeStep.value === 3 && residencyApplication.value.formValue.validated) {
        filledApplicationDownload();
      }
      residencyApplication.value.formValue.validate(false);
      if (activeStep.value === 4 && !residencyApplication.value.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: residencyApplication.value.formValue.getErrorMessage(),
        });
        scroll('#responce-form');
        return;
      }
      if (activeStep.value !== 3) {
        scroll('#responce-form');
      }
      activeStep.value++;
      if (activeStep.value > 4) {
        buttonOff.value = true;
        const loading = ElLoading.service({
          lock: true,
          text: 'Загрузка',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        await submit();
        buttonOff.value = false;
        loading.close();
        return;
      }
      clearAllValidate();
    };

    const toStep = async (stepNum: number) => {
      await scroll('#responce-form');
      if (stepNum >= activeStep.value) {
        return;
      }
      activeStep.value = stepNum;
    };

    const getButtonName = (): string => {
      return activeStep.value < 4 ? 'Перейти к следующему шагу' : 'Отправить';
    };

    return {
      textFieldsAndDocuments,
      buttonOff,
      getButtonName,
      achievementsForm,
      questionsForm,
      userForm,
      submitStep,
      activeStep,
      filledApplicationDownload,
      residencyApplication,
      residencyCourse,
      mounted,
      submit,
      user,
      isAuth,
      form,
      findEmail,
      emailExists,
      UserFormFields,
      textFields,
      toStep,
      steps,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-item-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}

.navigate-buttons {
  text-align: center;
  margin: 10px;
  .forward-btn {
    margin: 10px;
    text-align: center;
    border-radius: 20px;
    background-color: #31af5e;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
    &:disabled {
      background-color: #76cc94;
      cursor: auto;
    }
  }
  .back-btn {
    margin: 10px;
    text-align: center;
    border-radius: 20px;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
    &:disabled {
      background-color: #76cc94;
      cursor: auto;
    }
    background-color: #f49524;
  }
}

.success-step {
  cursor: pointer;
  :deep(.el-step__title) {
    color: #31af5e;
  }
  &:hover :deep(.el-step__icon) {
    color: lighten(#31af5e, 15%);
    transform: scale(1.1);
  }
  &:hover :deep(.el-step__title) {
    color: lighten(#31af5e, 15%);
  }
}
:deep(.el-steps) {
  margin-bottom: 10px;
}
:deep(.el-step__title) {
  line-height: 1;
  padding: 10px;
}
</style>
