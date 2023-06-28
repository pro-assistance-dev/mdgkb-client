<template>
  <div v-if="mounted" id="responce-form" class="card-item" style="padding: 30px">
    <h2 class="title article-title">Форма для подачи заявления</h2>

    <el-steps :active="activeStep" finish-status="success">
      <el-step v-for="(step, i) in steps" :key="step" :class="{ 'success-step': activeStep > i }" :title="step" @click="toStep(i)" />
    </el-steps>

    <!-- Шаг 1 -->
    <el-form
      v-if="activeStep === 0"
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
          <el-option v-for="item in residencyCourses" :key="item.id" :label="item.getMainSpecialization().name" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <!-- TODO: Добавить ссылки на правила и уставы -->
      <el-form-item prop="agreedWithRules" :rules="[{ validator: agreedWithRulesRule, trigger: 'change' }]">
        <el-checkbox v-model="residencyApplication.agreedWithRules" label="Я ПОДТВЕРЖДАЮ, ЧТО ОЗНАКОМЛЕН с:" />
        <div class="text">
          <p>
            Лицензией на ведение образовательной деятельности по образовательным программам послевузовского образования №
            Л035-00115-77/00096790 от «02» февраля 2015 г
          </p>
          <p>
            Свидетельством о государственной аккредитации по имеющим государственную аккредитацию образовательным программам № 2645 от «17»
            июля 2017 г. серия 90А01, номер бланка 0002774
          </p>
          <p>
            Уставом и Правилами внутреннего распорядка ГБУЗ «Морозовская детская городская клиническая больница Департамента здравоохранения
            города Москвы»
          </p>
          <p>Датой предоставления подлинника документа об образовании (01.09.2023)</p>
          <p>
            Правилами приема, утвержденными ГБУЗ «Морозовская ДГКБ ДЗМ», в том числе с правилами подачи апелляции по результатам
            вступительного испытания
          </p>
        </div>
      </el-form-item>
      <el-form-item prop="agreedWithPrivacy" :rules="[{ validator: agreedWithPrivacyRule, trigger: 'change' }]">
        <el-checkbox v-model="residencyApplication.agreedWithPrivacy" label="ПОДТВЕРЖДАЮ:" />
        <div class="text">
          <p>
            <!-- TODO: Добавить согласие для скачки -->
            <!-- TODO: Ошибка no file при скачке  -->
            <!-- <a target="_blank" href="/files/privacy.pdf" download="Согласие на обработку своих персональных данных МДГКБ" class="info-text">
              Согласие на обработку своих персональных данных
            </a> -->
            Согласие на обработку своих персональных данных, в том числе: фамилии, имени, отчества, паспортных данных, даты и места
            рождения, данных о прописке и фактическом месте проживания, телефонных номеров, адресов электронной почты, фотографии, образца
            личной подписи, профессиональной подготовке и образовании, в информационных системах, базах и банках данных в порядке,
            установленном Федеральным законом от 27 июля 2006 г. N152-ФЗ «О персональных данных» (Собрание законодательства Российской
            Федерации, 2006, N31, ст. 3451).
          </p>
          <p>
            В случае поступления в ГБУЗ «Морозовская детская городская клиническая больница Департамента здравоохранения города Москвы»
            согласен с передачей вышеуказанных данных в информационные системы, базы ГБУЗ «Морозовская детская городская клиническая
            больница Департамента здравоохранения города Москвы» с их последующей обработкой согласно действующему Законодательству РФ.
          </p>
        </div>
      </el-form-item>
    </el-form>

    <!-- Шаг 2 -->
    <el-form
      v-if="activeStep === 1"
      ref="questionsForm"
      :model="residencyApplication"
      label-position="top"
      style="max-width: 700px; margin: 0 auto"
    >
      <AdmissionQuestionsFormV2 :residency-application="residencyApplication" @all-questions-answered="submitStep" />
    </el-form>

    <!-- Шаг 3 -->
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
        :active-fields="UserFormFields.CreateWithAllUserFields()"
        @findEmail="findEmail"
      />
    </el-form>
    <!-- Шаг 4 -->
    <!-- Данные о дипломе -->
    <el-form
      v-if="activeStep === 3"
      ref="diplomaForm"
      :model="residencyApplication"
      style="max-width: 700px; margin: 0 auto"
      label-position="top"
    >
      <DiplomaForm />
    </el-form>

    <!-- Шаг 5 -->
    <el-form
      v-if="activeStep === 4"
      ref="achievementsForm"
      v-model="residencyApplication"
      :model="residencyApplication"
      label-position="top"
    >
      <ResidencyApplicationAchievements :residency-application="residencyApplication" />
    </el-form>

    <!-- Диплом из шаблона -->
    <!-- <el-form style="max-width: 700px; margin: 0 auto" label-position="top">
      <FieldValuesForm v-if="activeStep === 3" :form="residencyApplication.formValue" :leave-fields-with-code="textFields" />
    </el-form> -->

    <!-- Шаг 6 -->
    <!-- Загрузка документов -->
    <el-form v-if="activeStep === 5" style="max-width: 700px; margin: 0 auto" label-position="top">
      <div class="text">
        <p>Содержание документов должно быть читаемо, не четкие копии комиссия не принимает!</p>
        <p>
          Копии документов загружаются в ЦВЕТЕ
          <i>
            (Диплом, приложение, паспорт, копии с синими печатями и подписями - черно-белые копии данных документов комиссия не принимает!)
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
import ResidencyCourse from '@/classes/ResidencyCourse';
import UserFormFields from '@/classes/UserFormFields';
import AdmissionQuestionsFormV2 from '@/components/Educational/AdmissionCommittee/AdmissionQuestionsFormV2.vue';
import DiplomaForm from '@/components/Educational/AdmissionCommittee/DiplomaForm.vue';
import ResidencyApplicationAchievements from '@/components/Educational/Residency/ResidencyApplicationAchievements.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IUser from '@/services/interfaces/IUser';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';
import validate from '@/services/validate';

export default defineComponent({
  // Версия формы для приемной компании от 07.2023
  name: 'AdmissionFormV2',
  components: { FieldValuesForm, UserForm, ResidencyApplicationAchievements, AdmissionQuestionsFormV2, DiplomaForm },
  emits: ['close'],
  setup(_, { emit }) {
    const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['residencyApplications/emailExists']);
    const mounted = ref(false);
    const activeStep: Ref<number> = ref(0);
    const residencyApplication: ComputedRef<ResidencyApplication> = computed<ResidencyApplication>(
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
      'Выберите программу',
      'Ответьте на вопросы',
      'Заполните личные данные',
      'Данные об образовании',
      'Индивидуальные достижения',
      'Загрузите пакет документов',
    ];
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

    const residencyCourse: Ref<ResidencyCourse> = computed<ResidencyCourse>(() => Provider.store.getters['residencyCourses/item']);
    const residencyCourses: ComputedRef<ResidencyCourse[]> = computed(() => Provider.store.getters['residencyCourses/items']);
    const user: Ref<IUser> = computed(() => Provider.store.getters['auth/user']);
    const isAuth: Ref<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const form = ref();
    const userForm = ref();
    const diplomaForm = ref();
    const stepOneForm = ref();
    const questionsForm = ref();
    const achievementsForm = ref();

    watch(isAuth, async () => {
      Provider.store.commit('residencyApplications/setUser', user.value);
      // await findEmail();
    });

    const findEmail = async () => {
      await Provider.store.dispatch('residencyApplications/emailExists', residencyCourse.value.id);
    };

    const submit = async () => {
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
      await Provider.store.dispatch('residencyApplications/create');
      ElNotification.success('Заявка успешно отправлена');
      emit('close');
      await Provider.router.push('/admission-committee');
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('residencyCourses/getAll');
      // Инициализация шаблона формы после выбора программы
      // Provider.store.commit('residencyApplications/setFormValue', residencyCourse.value.formPattern);
      // residencyApplication.value.formValue.initFieldsValues();
      // Provider.store.commit('residencyApplications/setCourse', residencyCourse.value);
      Provider.store.commit('residencyApplications/resetItem');
      Provider.store.commit('residencyApplications/setAdmissionCommittee', true);
      Provider.store.commit('residencyApplications/setUser', user.value);

      // await findEmail();
      mounted.value = true;
    });

    const courseChangeHandler = async () => {
      Provider.store.commit('residencyApplications/setFormValue', residencyApplication.value.residencyCourse?.formPattern);
      residencyApplication.value.formValue.initFieldsValues();
      Provider.store.commit('residencyApplications/setAdmissionCommittee', true);
      Provider.store.commit('residencyApplications/setCourse', residencyApplication.value.residencyCourse);
      Provider.store.commit('residencyApplications/setUser', user.value);
    };

    const filledApplicationDownload = () => {
      ElMessageBox.alert(
        `<p>ВЫ ЗАВЕРШИЛИ ВНЕСЕНИЕ ОСНОВНЫХ ДАННЫХ, ВАМ БУДЕТ ПРЕДЛОЖЕНО СКАЧАТЬ И РАСПЕЧАТАТЬ ЧАСТИЧНО ЗАПОЛНЕННОЕ СИСТЕОМЙ ЗАЯВЛЕНИЕ:</p>
        <p>1. ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ ВСЕХ ВНЕСЕННЫХ ДАННЫХ</p>
        <p>2. ЗАПОЛНИТЕ НЕДОСТАЮЩИЕ ДАННЫЕ ОТ РУКИ СИНИМИ ЧЕРНИЛАМИ</p>
        <p>3. ПОСТАЬТЕ ПОДПИСИ ПО ОЗНАКОМЛЕНИЮ С ДОКУМЕНТАМИ</p>
        <p>4. ВНЕСИТЕ ПАСПОРТНЫЕ ДАННЫЕ</p>
        <p>5. ПОСТАВЬТЕ ЗАКЛЮЧИТЕЛЬНУЮ ПОДПИСЬ И ДАТУ ОФОРМЛЕНИЯ ЗАЯВЛЕНИЯ</p>
        <br />
        <p>ПРИ НАЛИЧИИ ОШИБОК ИСПРАВЬТЕ НА САЙТЕ И ЗАНОВО РАСПЕЧАТАЙТЕ ФОРМУ</p>
        `,
        'После закрытия этого окна скачается предзаполненное заявление',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: 'OK',
          callback: () => {
            const form = new ResidencyApplication(residencyApplication.value);

            Provider.store.dispatch('residencyApplications/filledApplicationDownload', form);
            scroll();
            return;
          },
        }
      );
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
        ElMessage({
          type: 'error',
          message: 'Необходимо добавить все файлы',
        });
        return;
      }
      if (activeStep.value === 4) {
        filledApplicationDownload();
      }
      residencyApplication.value.formValue.validate(false);
      if (activeStep.value === 5 && !residencyApplication.value.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: residencyApplication.value.formValue.getErrorMessage(),
        });
        return;
      }
      if (activeStep.value !== 6) {
        scroll();
      }
      activeStep.value++;
      if (activeStep.value > 5) {
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
    };

    const toStep = async (stepNum: number) => {
      await scroll();
      if (stepNum >= activeStep.value) {
        return;
      }
      activeStep.value = stepNum;
    };

    const getButtonName = (): string => {
      return activeStep.value < 5 ? 'Перейти к следующему шагу' : 'Отправить';
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
      residencyCourses,
      courseChangeHandler,
      stepOneForm,
      agreedWithPrivacyRule,
      agreedWithRulesRule,
      diplomaForm,
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
