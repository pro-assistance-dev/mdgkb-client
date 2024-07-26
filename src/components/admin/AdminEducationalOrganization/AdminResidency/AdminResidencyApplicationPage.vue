<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="application" :model="application" label-position="top">
      <el-card>
        <template #header>
          <div style="display: flex; justify-content: space-between">
            <span>Общая информация</span>
            <el-button v-if="!application.userEdit" size="mini" type="success" @click="application.changeUserEdit(true)">
              Дать возможность редактирования
            </el-button>
          </div>
        </template>
        <div v-if="isEditMode">
          <el-form-item
            v-if="!application.residencyCourseId"
            label="Выберите программу"
            prop="residencyCourseId"
            :rules="[{ required: true, message: 'Необходимо выбрать программу', trigger: 'change' }]"
          >
            <el-select
              v-model="application.residencyCourse"
              value-key="id"
              placeholder="Выберите программу"
              style="width: 100%"
              @change="courseChangeHandler"
            >
              <el-option v-for="item in residencyCourses" :key="item.id" :label="item.getMainSpecialization()" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Номер заявления" prop="applicationNum">
            <el-input v-model="application.applicationNum" placeholder="Номер заявления" value-key="id" style="width: 100%" />
          </el-form-item>
          <el-form-item v-if="application.admissionCommittee" label="Баллы вступительных испытаний" prop="pointsEntrance">
            <el-input-number v-model="application.pointsEntrance" value-key="id" />
          </el-form-item>
        </div>
        <el-descriptions v-else :column="1" border>
          <el-descriptions-item label="Наименование программы">
            {{ application.residencyCourse?.getFullName() }}
          </el-descriptions-item>
          <el-descriptions-item label="Платно/бесплатно">
            {{ application.paid ? 'Платно' : 'Бесплатно' }}
          </el-descriptions-item>
          <el-descriptions-item label="Основная/дополнительная специальности">
            {{ application.main ? 'Основная' : 'Дополнительная' }}
          </el-descriptions-item>
          <el-descriptions-item label="Первичная аккредитация">
            {{ application.getPrimaryAccreditationInfo() }}
          </el-descriptions-item>
          <el-descriptions-item label="Номер заявления">
            <span v-if="application.applicationNum">{{ application.applicationNum }}</span>
            <span v-else>Не назначен</span>
          </el-descriptions-item>
          <div v-if="application.admissionCommittee">
            <el-descriptions-item label="Баллы вступительных испытаний">
              {{ application.pointsEntrance }}
            </el-descriptions-item>
            <el-descriptions-item label="Баллы индивидуальных достижений">
              {{ application.calculateAchievementsPoints(true) }}
            </el-descriptions-item>
            <el-descriptions-item label="Всего баллов">
              {{ application.getPointsSum() }}
            </el-descriptions-item>
          </div>
        </el-descriptions>
      </el-card>

      <el-card header="Данные о дипломе">
        <el-descriptions v-if="!isEditMode" :column="1" border>
          <el-descriptions-item label="ВУЗ">
            {{ application.diploma.universityName }}
            <template #label>
              <span>ВУЗ</span>
              <el-popover placement="left-start" width="auto" trigger="hover" content="Копировать ВУЗ">
                <template #reference>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    icon="el-icon-document-copy"
                    @click="clickCopyHandler(application.diploma.universityName, 'ВУЗ')"
                  ></el-button>
                </template>
              </el-popover>
            </template>
          </el-descriptions-item>

          <el-descriptions-item label="Дата окончания">
            {{ $dateTimeFormatter.format(application.diploma.universityEndDate) }}
            <template #label>
              <span>Дата окончания</span>
              <el-popover placement="left-start" width="auto" trigger="hover" content="Копировать дату окончания">
                <template #reference>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    icon="el-icon-document-copy"
                    @click="clickCopyHandler($dateTimeFormatter.format(application.diploma.universityEndDate), 'Дата окончания')"
                  ></el-button>
                </template>
              </el-popover>
            </template>
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <span>Серия</span>
              <el-popover placement="left-start" width="auto" trigger="hover" content="Копировать серию и номер">
                <template #reference>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    icon="el-icon-document-copy"
                    @click="clickCopyHandler(application.diploma.getSeriesAndNumber(), 'Серия и номер')"
                  ></el-button>
                </template>
              </el-popover>
            </template>
            {{ application.diploma.series }}
          </el-descriptions-item>

          <el-descriptions-item label="Номер">
            {{ application.diploma.number }}
          </el-descriptions-item>

          <el-descriptions-item label="Дата выдачи">
            {{ $dateTimeFormatter.format(application.diploma.date) }}
            <template #label>
              <span>Дата выдачи</span>
              <el-popover placement="left-start" width="auto" trigger="hover" content="Копировать дату выдачи">
                <template #reference>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    icon="el-icon-document-copy"
                    @click="clickCopyHandler($dateTimeFormatter.format(application.diploma.date), 'Дата выдачи')"
                  ></el-button>
                </template>
              </el-popover>
            </template>
          </el-descriptions-item>

          <el-descriptions-item label="Код специальности">
            {{ application.diploma.specialityCode }}
            <template #label>
              <span>Код специальности</span>
              <el-popover placement="left-start" width="auto" trigger="hover" content="Копировать код специальности">
                <template #reference>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    icon="el-icon-document-copy"
                    @click="clickCopyHandler(application.diploma.specialityCode, 'Код специальности')"
                  ></el-button>
                </template>
              </el-popover>
            </template>
          </el-descriptions-item>

          <el-descriptions-item label="Расшифровка специальности">
            {{ application.diploma.speciality }}
            <template #label>
              <span>Расшифровка специальности</span>
              <el-popover placement="left-start" width="auto" trigger="hover" content="Копировать расшифровку специальности">
                <template #reference>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    icon="el-icon-document-copy"
                    @click="clickCopyHandler(application.diploma.speciality, 'Расшифровка специальности')"
                  ></el-button>
                </template>
              </el-popover>
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <div v-else>
          <DiplomaForm />
        </div>
      </el-card>

      <div v-if="application.residencyCourse?.id">
        <AdminFormValue
          :form="application.formValue"
          :validate-email="false"
          :active-fields="
            application.admissionCommittee
              ? UserFormFields.CreateWithAllUserFields()
              : UserFormFields.CreateWithFullName({ userSnils: true })
          "
          :is-edit-mode="isEditMode"
          :email-exists="emailExists"
          @find-email="findEmail"
        />
        <AdminResidencyApplicationAchievementsPoints
          v-if="application.admissionCommittee"
          :is-edit-mode="isEditMode"
          :residency-application="application"
        />
      </div>
      <el-card v-else style="color: red">Перед подачей заявления необходимо выбрать программу</el-card>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import FormStatus from '@/classes/FormStatus';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import UserFormFields from '@/classes/UserFormFields';
import AdminResidencyApplicationAchievementsPoints from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyApplicationAchievementsPoints.vue';
import DiplomaForm from '@/components/Educational/AdmissionCommittee/DiplomaForm.vue';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const mounted = ref(false);
const form = ref();

const application: ResidencyApplication = ResidencyApplicationsStore.Item();
const residencyCourses: ResidencyCourse[] = ResidencyCoursesStore.Items();
const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
const isEditMode: Ref<boolean> = ref(false);
const editButtonTitle: Ref<string> = ref('Режим редактирования');

onBeforeMount(async () => {
  PHelp.Loading.Show();
  await loadCourses();
  await loadItem();
  await updateNew();
  await findEmail();
  PHelp.Loading.Hide();
});

const loadCourses = async () => {
  await ResidencyCoursesStore.GetAll();
};

const changeEditMode = () => {
  isEditMode.value = !isEditMode.value;
  if (isEditMode.value) {
    editButtonTitle.value = 'Режим просмотра';
  } else {
    editButtonTitle.value = 'Режим редактирования';
  }
};

const findEmail = async () => {};

const updateNew = async () => {
  if (!Router.Id() || !application.formValue.isNew) {
    return;
  }
  application.formValue.isNew = false;

  await ResidencyApplicationsStore.Update(application);
};

let initialStatus: FormStatus;
const loadItem = async () => {
  let pageTitle = '';
  if (Router.Id()) {
    await ResidencyApplicationsStore.Get(Router.Id());
    initialStatus = application.formValue.formStatus;
    pageTitle = `Заявление от ${application.formValue.user.email}`;
  } else {
    pageTitle = 'Подача заявления на обучение в ординатуре';
    ResidencyApplicationsStore.ResetItem();
    isEditMode.value = true;
  }
  PHelp.AdminUI.Head.Set(pageTitle, [Button.Success(editButtonTitle, changeEditMode), Button.Success('Сохранить', submit)]);
  mounted.value = true;
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(application, formUpdated, { deep: true });
};

const submit = async (next?: NavigationGuardNext) => {
  application.formValue.validate();
  saveButtonClick.value = true;
  if (!validate(form, true) || !application.formValue.validated) {
    PHelp.Notification.Error(application.formValue.getErrorMessage());
    saveButtonClick.value = false;
    return;
  }
  PHelp.Loading.Show();
  if (Router.Id()) {
    application.formValue.updateViewedByUser(initialStatus);

    await ResidencyApplicationsStore.Update();
  } else {
    application.formValue.clearIds();
    await ResidencyApplicationsStore.Create();
  }
  PHelp.Loading.Hide();
  next ? next() : await Router.To(`/admin/residency-applications`);
};

const courseChangeHandler = async () => {
  if (!Router.Id()) {
    ResidencyApplicationsStore.SetCourse(application.residencyCourse);
    ResidencyApplicationsStore.SetFormValue(application.residencyCourse?.formPattern);
    application.formValue.initFieldsValues();
  }
  await findEmail();
  // application.residencyCourseId = application.residencyCourse.id;
  // application.removeAllFieldValues();
  // application.residencyCourse.formPattern.removeAllFieldValues();
  // application.residencyCourse.formPattern.initFieldsValues();
};

const clickCopyHandler = async (copyValue: string, fieldName: string) => {
  await navigator.clipboard.writeText(copyValue);
  PHelp.Notification.Success(`${fieldName} скопирован в буфер обмена`);
};

onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showConfirmModal(submit, next);
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.el-card {
  margin-bottom: 20px;
}

table {
  height: 100%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dcdfe6;
  padding: 5px 7px 5px 7px;
}

th {
  text-align: left;
  padding: 5px;
  border-right: 1px solid #f2f2f2;
}

th:last-child {
  border-right: 1px solid #dcdfe6;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.flex {
  display: flex;
  align-items: center;
}

:deep(.el-descriptions__cell) {
  position: relative;

  .el-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
