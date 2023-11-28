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
          @findEmail="findEmail"
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

<script lang="ts">
import { ElLoading, ElMessage, ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FormStatus from '@/classes/FormStatus';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import UserFormFields from '@/classes/UserFormFields';
import AdminResidencyApplicationAchievementsPoints from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyApplicationAchievementsPoints.vue';
import DiplomaForm from '@/components/Educational/AdmissionCommittee/DiplomaForm.vue';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminResidencyApplicationPage',
  components: { AdminFormValue, AdminResidencyApplicationAchievementsPoints, DiplomaForm },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();

    const application: ComputedRef<ResidencyApplication> = computed<ResidencyApplication>(
      () => store.getters['residencyApplications/item']
    );
    const residencyCourses: ComputedRef<ResidencyCourse[]> = computed(() => store.getters['residencyCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактирования');
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['residencyApplications/emailExists']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadCourses();
      await loadItem();
      await updateNew();
      await findEmail();
      store.commit('admin/closeLoading');
    });

    const loadCourses = async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      await store.dispatch('residencyCourses/getAll');
    };

    const changeEditMode = () => {
      isEditMode.value = !isEditMode.value;
      if (isEditMode.value) {
        editButtonTitle.value = 'Режим просмотра';
      } else {
        editButtonTitle.value = 'Режим редактирования';
      }
    };

    const findEmail = async () => {
      await store.dispatch('residencyApplications/emailExists', application.value.residencyCourse?.id);
    };

    const updateNew = async () => {
      if (!route.params['id']) {
        return;
      }
      if (!application.value.formValue.isNew) {
        return;
      }
      application.value.formValue.isNew = false;
      await store.dispatch('residencyApplications/updateWithoutReset', application.value);
    };

    let initialStatus: FormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('residencyApplications/get', route.params['id']);
        initialStatus = application.value.formValue.formStatus;
        pageTitle = `Заявление от ${application.value.formValue.user.email}`;
      } else {
        pageTitle = 'Подача заявления на обучение в аспирантуре';
        store.commit('residencyApplications/resetItem');
        isEditMode.value = true;
      }
      store.commit('admin/setHeaderParams', {
        title: pageTitle,
        showBackButton: true,
        buttons: [{ text: editButtonTitle, type: 'primary', action: changeEditMode }, { action: submit }],
      });
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(application, formUpdated, { deep: true });
    };

    const submit = async (next?: NavigationGuardNext) => {
      application.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !application.value.formValue.validated) {
        ElNotification.error({
          dangerouslyUseHTMLString: true,
          message: application.value.formValue.getErrorMessage(),
        });
        saveButtonClick.value = false;
        return;
      }
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (route.params['id']) {
        application.value.formValue.updateViewedByUser(initialStatus);
        await store.dispatch('residencyApplications/update');
      } else {
        application.value.formValue.clearIds();
        await store.dispatch('residencyApplications/create');
      }
      loading.close();
      next ? next() : await router.push(`/admin/residency-applications`);
    };

    const courseChangeHandler = async () => {
      if (!route.params['id']) {
        store.commit('residencyApplications/setCourse', application.value.residencyCourse);
        store.commit('residencyApplications/setFormValue', application.value.residencyCourse?.formPattern);
        application.value.formValue.initFieldsValues();
      }
      await findEmail();
      // application.value.residencyCourseId = application.value.residencyCourse.id;
      // application.value.removeAllFieldValues();
      // application.value.residencyCourse.formPattern.removeAllFieldValues();
      // application.value.residencyCourse.formPattern.initFieldsValues();
    };

    const clickCopyHandler = async (copyValue: string, fieldName: string) => {
      await navigator.clipboard.writeText(copyValue);
      ElMessage({
        message: `${fieldName} скопирован в буфер обмена`,
        type: 'success',
      });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      form,
      application,
      residencyCourses,
      isEditMode,
      courseChangeHandler,
      findEmail,
      emailExists,
      UserFormFields,
      clickCopyHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
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
