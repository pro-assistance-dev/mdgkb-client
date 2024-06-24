<template>
  <div v-if="mounted" id="responce-form" class="card-item" style="padding: 30px">
    <h2 class="title article-title">Форма для подачи заявления</h2>

    <el-steps :active="activeStep" finish-status="success">
      <el-step v-for="(step, i) in steps" :key="step" :class="{ 'success-step': activeStep > i }" :title="step" @click="toStep(i)" />
    </el-steps>

    <!-- Шаг 1 -->
    <KeepAlive>
      <el-form
        v-show="activeStep === 0"
        ref="stepOneForm"
        style="max-width: 700px; margin: 0 auto"
        label-position="top"
        :model="residencyApplication"
      >
        <el-form-item
          label="Выберите программу"
          prop="residencyCourseId"
          :rules="[{ required: true, message: 'Необходимо выбрать программу', trigger: 'change' }]"
        >
          <el-select
            v-model="residencyApplication.residencyCourse"
            value-key="id"
            placeholder="Выберите программу"
            style="width: 100%"
            @change="courseChangeHandler"
          >
            <el-option v-for="item in residencyCourses" :key="item.id" :label="item.getMainSpecialization().name" :value="item" />
          </el-select>
        </el-form-item>
        <!-- TODO: Добавить ссылки на правила и уставы -->
        <el-form-item prop="agreedWithRules" :rules="[{ validator: agreedWithRulesRule, trigger: 'change' }]">
          <el-checkbox v-model="residencyApplication.agreedWithRules" label="Я ПОДТВЕРЖДАЮ, ЧТО ОЗНАКОМЛЕН с:" />
          <div class="text" v-html="licensyText" />
        </el-form-item>
        <el-form-item prop="agreedWithPrivacy" :rules="[{ validator: agreedWithPrivacyRule, trigger: 'change' }]">
          <el-checkbox v-model="residencyApplication.agreedWithPrivacy" label="ПОДТВЕРЖДАЮ:" />
          <div class="text" v-html="privacyText" />
        </el-form-item>
      </el-form>
    </KeepAlive>

    <!-- Шаг 2 -->
    <KeepAlive>
      <el-form
        v-if="activeStep === 1"
        ref="questionsForm"
        :model="residencyApplication"
        label-position="top"
        style="max-width: 700px; margin: 0 auto"
      >
        <AdmissionQuestionsForm :residency-application="residencyApplication" @all-questions-answered="submitStep" />
      </el-form>
    </KeepAlive>

    <!-- Шаг 3 -->
    <KeepAlive>
      <el-form
        v-if="activeStep === 2"
        id="admission-course-form"
        ref="userForm"
        style="max-width: 700px; margin: 0 auto"
        :model="residencyApplication"
        label-width="150px"
      >
        <UserForm
          :form="residencyApplication.formValue"
          :email-exists="emailExists"
          :active-fields="UserFormFields.CreateWithAllUserFields().setUserEmail(false)"
          @find-email="findEmail"
        />
      </el-form>
    </KeepAlive>

    <!-- Шаг 4 -->
    <!-- Данные о дипломе -->
    <KeepAlive>
      <el-form
        v-if="activeStep === 3"
        ref="diplomaForm"
        :model="residencyApplication"
        style="max-width: 700px; margin: 0 auto"
        label-position="top"
      >
        <DiplomaForm />
      </el-form>
    </KeepAlive>

    <!-- Шаг 5 -->
    <KeepAlive>
      <el-form
        v-if="activeStep === 4"
        ref="achievementsForm"
        v-model="residencyApplication"
        :model="residencyApplication"
        label-position="top"
      >
        <ResidencyApplicationAchievements :residency-application="residencyApplication" />
      </el-form>
    </KeepAlive>

    <!-- Диплом из шаблона -->
    <!-- <el-form style="max-width: 700px; margin: 0 auto" label-position="top">
      <FieldValuesForm v-if="activeStep === 3" :form="residencyApplication.formValue" :leave-fields-with-code="textFields" />
    </el-form> -->

    <!-- Шаг 6 -->
    <!-- Загрузка документов -->
    <KeepAlive>
      <el-form v-if="activeStep === 5" style="max-width: 700px; margin: 0 auto" label-position="top">
        <div class="text">
          <p>Содержание документов должно быть читаемо, не четкие копии комиссия не принимает!</p>
          <p>
            Копии документов загружаются в ЦВЕТЕ
            <i>
              (Диплом, приложение, паспорт, копии с синими печатями и подписями - черно-белые копии данных документов комиссия не
              принимает!)
            </i>
          </p>
          <p>
            При возникновении проблем с загрузкой документов и отображения личного кабинета обращаться в техподдержку кабинета приема
            заявлений lakkinzimusic@gmail.com (писать с темой "заявление в ординатуру")
          </p>
        </div>
        <FieldValuesForm
          :form="residencyApplication.formValue"
          :filter-fields-with-code="textFieldsAndDocuments"
          :show-additional-files="true"
        />
      </el-form>
    </KeepAlive>

    <div class="navigate-buttons">
      <button :disabled="buttonOff" class="forward-btn" @click="submitStep">
        <span>{{ getButtonName() }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import User from '@/classes/User';
import UserFormFields from '@/classes/UserFormFields';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import residencyCoursesFiltersLib from '@/libs/filters/ResidencyCoursesFiltersLib';
import residencyCoursesSortsLib from '@/libs/sorts/ResidencyCoursesSortsLib';
import Auth from '@/services/classes/Auth';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';
import validate from '@/services/validate';

import { licensyText, privacyText, steps, templateAlert, textFieldsAndDocuments } from './AdmissionData';

const emits = defineEmits(['close']);
const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['residencyApplications/emailExists']);
const mounted = ref(false);
const activeStep: Ref<number> = ref(4);
const residencyApplication: ComputedRef<ResidencyApplication> = Store.Item('residencyApplications');

const authModal: ComputedRef<Auth> = Store.Getters('auth/modal');
const textFields = ['DiplomaNumber', 'DiplomaSeries', 'DiplomaDate', 'UniversityEndYear', 'UniversityName', 'DiplomaSpeciality'];

const agreedWithRulesRule = async (_: unknown, value: boolean, callback: MyCallbackWithOptParam) => {
  if (value !== true) {
    callback(new Error('Необходимо подтвердить ознакомление'));
    return;
  }
  callback();
  return;
};

const agreedWithPrivacyRule = async (_: unknown, value: boolean, callback: MyCallbackWithOptParam) => {
  if (value !== true) {
    callback(new Error('Необходимо подтвердить согласие'));
    return;
  }
  callback();
  return;
};

const buttonOff: Ref<boolean> = ref(false);

const residencyCourse: Ref<ResidencyCourse> = Store.Item('residencyCourses');
const residencyCourses: ComputedRef<ResidencyCourse[]> = Store.Items('residencyCourses');

const auth: Ref<Auth<User>> = Store.Getters('auth/auth');
auth.value.preventLogout = true;

const user: ComputedRef<User> = computed(() => auth.value.user.get());
const isAuth: Ref<boolean> = computed(() => auth.value.isAuth);

const userForm = ref();
const diplomaForm = ref();
const stepOneForm = ref();
const questionsForm = ref();
const achievementsForm = ref();

watch(isAuth, async () => {
  if (!isAuth.value) {
    residencyApplication.value.formValue.user = new User(user.value);
    authModal.value.open(false);
  }
  // await findEmail();
});

// watch(
//   () => authModal.value.visible,
//   () => {
//     if (!isAuth.value) {
//       authModal.value.open();
//     }
//   }
// );

const findEmail = async () => {
  await Store.Dispatch('residencyApplications/emailExists', residencyCourse.value.id);
};

const submit = async () => {
  buttonOff.value = true;
  // TODO: временно убрана проверка email, чтобы можно было подавать заявку повторно, при отказе или отзыве
  // if (emailExists.value) {
  //   ElNotification.error({
  //     dangerouslyUseHTMLString: true,
  //     message: document.querySelector('#error-block-message')?.innerHTML || '',
  //   });
  //   scroll();
  //   return;
  // }
  residencyApplication.value.formValue.clearIds();
  residencyApplication.value.formValue.createdAt = new Date();
  await Store.Create('residencyApplications');
  PHelp.Notification().Success('Заявка успешно отправлена');
  emits('close');
  buttonOff.value = false;
};

onBeforeMount(async () => {
  if (!isAuth.value) {
    residencyApplication.value.formValue.user = new User(user.value);
    authModal.value.open(false);
  }

  const ftsp = new FTSP();
  ftsp.setF(residencyCoursesFiltersLib.onlyThisYear());
  ftsp.setS(residencyCoursesSortsLib.byName(Orders.Asc));
  await Store.FTSP('residencyCourses', { ftsp: ftsp });

  // Инициализация шаблона формы после выбора программы
  Store.Commit('residencyApplications/setFormValue', residencyCourse.value.formPattern);
  residencyApplication.value.formValue.initFieldsValues();
  Store.Commit('residencyApplications/setCourse', residencyCourse.value);

  Store.Commit('residencyApplications/resetItem');
  Store.Commit('residencyApplications/setAdmissionCommittee', true);
  // Provider.store.commit('residencyApplications/setUser', user.value);

  // await findEmail();
  mounted.value = true;
});

const courseChangeHandler = async () => {
  Store.Commit('residencyApplications/setFormValue', residencyApplication.value.residencyCourse?.formPattern);
  residencyApplication.value.formValue.initFieldsValues();
  Store.Commit('residencyApplications/setAdmissionCommittee', true);
  Store.Commit('residencyApplications/setCourse', residencyApplication.value.residencyCourse);
  Store.Commit('residencyApplications/setUser', user.value);
};

const filledApplicationDownload = () => {
  ElMessageBox.alert(templateAlert, 'После закрытия этого окна скачается предзаполненное заявление', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    callback: () => {
      const form = new ResidencyApplication(residencyApplication.value);
      Store.Dispatch('residencyApplications/filledApplicationDownload', form);
      scroll();
      return;
    },
  });
  return;
};

const submitStep = async () => {
  if (activeStep.value === 0 && !validate(stepOneForm)) {
    return;
  }
  if (activeStep.value === 1 && !validate(questionsForm)) {
    return;
  }
  if (activeStep.value === 2 && !validate(userForm)) {
    return;
  }
  if (activeStep.value === 3 && !validate(diplomaForm)) {
    return;
  }
  if (activeStep.value === 4 && !residencyApplication.value.validateAchievementsPoints()) {
    PHelp.Notification().Error('Необходимо добавить все файлы');
    return;
  }
  if (activeStep.value === 4) {
    filledApplicationDownload();
  }
  residencyApplication.value.formValue.validate(false);
  if (activeStep.value === 5 && !residencyApplication.value.formValue.validated) {
    PHelp.Notification().Error(residencyApplication.value.formValue.getErrorMessage());
    return;
  }
  if (activeStep.value !== 6) {
    scroll();
  }
  activeStep.value++;
  if (activeStep.value > 5) {
    buttonOff.value = true;
    PHelp.Loading().Show();
    await submit();
    buttonOff.value = false;
    PHelp.Loading().Hide();
    await Router.To('/admission-committee');
  }
};

const toStep = async (stepNum: number) => {
  await scroll();
  if (stepNum >= activeStep.value) {
    return;
  }
  activeStep.value = stepNum;
};

onBeforeUnmount(() => {
  auth.value.preventLogout = false;
});

const getButtonName = (): string => {
  return activeStep.value < 5 ? 'Перейти к следующему шагу' : 'Отправить';
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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

h2,
h3 {
  margin-top: 0;
  color: #4a4a4a;
  text-align: center;
}

.text {
  line-height: 1.3;
}
</style>
