<template>
  <div v-if="mounted">
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="Заполните личные данные" />
      <el-step title="Ответьте на вопросы" />
      <el-step title="Укажите индивидуальные достижения" />
      <el-step title="Укажите прочую необходимую информацию" />
      <el-step title="Загрузите пакет документов" />
    </el-steps>

    <el-form ref="userForm" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <UserForm
        v-if="activeStep === 0"
        :form="residencyApplication.formValue"
        :email-exists="emailExists"
        :active-fields="UserFormFields.CreateWithAllUserFields()"
        @findEmail="findEmail"
      />
    </el-form>
    <el-form ref="questionsForm" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <AdmissionQuestionsForm v-if="activeStep === 1" :residency-application="residencyApplication" @all-questions-answered="submitStep" />
    </el-form>
    <el-form ref="achievementsForm" v-model="residencyApplication" :model="residencyApplication" label-position="top">
      <ResidencyApplicationAchievements v-if="activeStep === 2" :residency-application="residencyApplication" />
    </el-form>
    <el-form>
      <FieldValuesForm v-if="activeStep === 3" :form="residencyApplication.formValue" :leave-fields-with-code="textFields" />
    </el-form>
    <FieldValuesForm v-if="activeStep === 4" :form="residencyApplication.formValue" :filter-fields-with-code="textFields" />
    <div class="container-button">
      <button v-if="activeStep !== 1" class="response-btn" @click="submitStep">Перейти к следующему шагу</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';

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
    const mounted = ref(false);
    const activeStep: Ref<number> = ref(0);
    const residencyApplication: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => Provider.store.getters['residencyApplications/item']
    );
    const textFields = ['DiplomaNumber', 'DiplomaSeries', 'DiplomaDate', 'UniversityEndYear', 'UniversityName', 'DiplomaSpeciality'];

    const residencyCourse: Ref<IResidencyCourse> = computed<IResidencyCourse>(() => Provider.store.getters['residencyCourses/item']);
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['residencyApplications/emailExists']);
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
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: document.querySelector('#error-block-message')?.innerHTML || '',
        });
        scroll('#error-block-message');
        return;
      }
      residencyApplication.value.formValue.clearIds();
      await Provider.store.dispatch('residencyApplications/create');
      ElMessage({
        type: 'success',
        message: 'Заявка отправлена',
      });
      emit('close');
    };

    onBeforeMount(async () => {
      Provider.store.commit('residencyApplications/resetItem');
      Provider.store.commit('residencyApplications/setFormValue', residencyCourse.value.formPattern);
      residencyApplication.value.formValue.initFieldsValues();
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
            Provider.store.dispatch('residencyApplications/filledApplicationDownload', residencyApplication.value);
            return;
          },
        }
      );
      return;
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
      if (activeStep.value === 3 && residencyApplication.value.formValue.validated) {
        filledApplicationDownload();
      }
      residencyApplication.value.formValue.validate(false);
      if (activeStep.value === 4 && !residencyApplication.value.formValue.validated) {
        return;
      }
      activeStep.value++;
      scroll('#error-block-message');
      if (activeStep.value > 4) {
        await submit();
      }
    };

    return {
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

.container-button {
  text-align: center;
}
.response-btn {
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
</style>
