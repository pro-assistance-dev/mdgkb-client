<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="application" :model="application" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <div v-if="application.residencyCourse.id">
            <AdminFormValue
              :form="application.formValue"
              :validate-email="false"
              :active-fields="UserFormFields.CreateWithFullName({ userSnils: true })"
              :is-edit-mode="isEditMode"
              :email-exists="emailExists"
              @findEmail="findEmail"
            />
            <AdminResidencyApplicationAchievementsPoints :residency-application="application" />
          </div>
          <el-card v-else style="color: red">Перед подачей заявления необходимо выбрать программу</el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-card>
            <template #header>
              <span>Информация о программе</span>
            </template>
            <el-form-item
              v-if="isEditMode && !application.residencyCourseId"
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
            <el-descriptions v-else :column="1">
              <el-descriptions-item label="Наименование">
                {{ application.residencyCourse.getMainSpecialization().name }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card>
            <el-form-item v-if="isEditMode" label="Баллы вступительных испытаний" prop="pointsEntrance">
              <el-input-number v-model="application.pointsEntrance" value-key="id" style="width: 100%" />
            </el-form-item>
            <div v-else>Баллы вступительных испытаний: {{ application.pointsEntrance }}</div>
          </el-card>
          <el-card>
            <div>Баллы индивидуальных достижений: {{ application.calculateAchievementsPoints(true) }}</div>
          </el-card>
          <el-card>
            <div>Всего баллов: {{ application.pointsSum() }}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import UserFormFields from '@/classes/UserFormFields';
import AdminResidencyApplicationAchievementsPoints from '@/components/admin/AdminEducationalOrganization/AdminResidency/AdminResidencyApplicationAchievementsPoints.vue';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminResidencyApplicationPage',
  components: { AdminFormValue, AdminResidencyApplicationAchievementsPoints },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();

    const application: ComputedRef<IResidencyApplication> = computed<IResidencyApplication>(
      () => store.getters['residencyApplications/item']
    );
    const residencyCourses: ComputedRef<IResidencyCourse[]> = computed(() => store.getters['residencyCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактиварония');
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
        editButtonTitle.value = 'Режим редактиварония';
      }
    };

    const findEmail = async () => {
      await store.dispatch('residencyApplications/emailExists', application.value.residencyCourse.id);
    };

    const updateNew = async () => {
      if (!route.params['id']) {
        return;
      }
      if (!application.value.formValue.isNew) {
        return;
      }
      application.value.formValue.isNew = false;
      await store.dispatch('residencyApplications/update', application.value);
    };

    let initialStatus: IFormStatus;
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
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        application.value.formValue.updateViewedByUser(initialStatus);
        await store.dispatch('residencyApplications/update');
      } else {
        application.value.formValue.clearIds();
        await store.dispatch('residencyApplications/create');
      }
      next ? next() : await router.push(`/admin/residency-applications`);
    };

    const courseChangeHandler = async () => {
      if (!route.params['id']) {
        store.commit('residencyApplications/setCourse', application.value.residencyCourse);
        store.commit('residencyApplications/setFormValue', application.value.residencyCourse.formPattern);
        application.value.formValue.initFieldsValues();
      }
      await findEmail();
      // application.value.residencyCourseId = application.value.residencyCourse.id;
      // application.value.removeAllFieldValues();
      // application.value.residencyCourse.formPattern.removeAllFieldValues();
      // application.value.residencyCourse.formPattern.initFieldsValues();
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
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
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
</style>
