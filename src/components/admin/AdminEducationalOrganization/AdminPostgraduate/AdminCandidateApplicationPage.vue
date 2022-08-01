<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="application" :model="application" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <div v-if="application.candidateExam.id">
            <AdminFormValue :form="application.formValue" :is-edit-mode="isEditMode" :validate-email="false" />
          </div>
          <el-card v-else style="color: red">Перед подачей заявления необходимо выбрать экзамен</el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-card>
            <template #header>
              <span>Информация об экзамене</span>
            </template>
            <el-form-item
              v-if="isEditMode && !application.candidateExamId"
              label="Выберите экзамен"
              prop="candidateExamId"
              :rules="[{ required: true, message: 'Необходимо выбрать программу', trigger: 'change' }]"
            >
              <el-select
                v-model="application.candidateExam"
                value-key="id"
                placeholder="Выберите экзамен"
                style="width: 100%"
                @change="courseChangeHandler"
              >
                <el-option v-for="item in candidateExams" :key="item.id" :label="'Кандидатский экзамен'" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-descriptions v-else :column="1">
              <!--            <el-descriptions-item label="Наименование">{{ application.postgraduateCourse.name }}</el-descriptions-item>-->
              <!--            <el-descriptions-item label="Тип программы">{{ application.postgraduateCourse.isNmo ? 'НМО' : 'ДПО' }}</el-descriptions-item>-->
            </el-descriptions>
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

import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ICandidateExam from '@/interfaces/ICandidateExam';
import IFormStatus from '@/interfaces/IFormStatus';
import ISchema from '@/interfaces/schema/ISchema';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminCandidateApplicationPage',
  components: { AdminFormValue },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();
    const filterModel = ref();

    const application: ComputedRef<ICandidateApplication> = computed<ICandidateApplication>(
      () => store.getters['candidateApplications/item']
    );
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);
    const candidateExams: Ref<ICandidateExam[]> = computed<ICandidateExam[]>(() => [store.getters['candidateExams/item']]);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактирования');

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadExam();
      await loadItem();
      await updateNew();
      store.commit('admin/closeLoading');
    });

    const loadExam = async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      await store.dispatch('candidateExams/get');
    };

    const changeEditMode = () => {
      isEditMode.value = !isEditMode.value;
      if (isEditMode.value) {
        editButtonTitle.value = 'Режим просмотра';
      } else {
        editButtonTitle.value = 'Режим редактирования';
      }
    };

    const updateNew = async () => {
      if (!route.params['id']) {
        return;
      }
      if (!application.value.formValue.isNew) {
        return;
      }
      application.value.formValue.isNew = false;
      await store.dispatch('candidateApplications/update', application.value);
    };

    let initialStatus: IFormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('candidateApplications/get', route.params['id']);
        initialStatus = application.value.formValue.formStatus;
        pageTitle = `Заявление от ${application.value.formValue.user.email}`;
      } else {
        pageTitle = 'Подача заявления на сдачу кандидатского';
        store.commit('candidateApplications/resetItem');
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
        await store.dispatch('candidateApplications/update');
      } else {
        application.value.formValue.clearIds();
        await store.dispatch('candidateApplications/create');
      }
      next ? next() : await router.push(`/admin/candidate-applications`);
    };

    const courseChangeHandler = () => {
      if (!route.params['id']) {
        store.commit('candidateApplications/setExam', application.value.candidateExam);
        store.commit('candidateApplications/setFormValue', application.value.candidateExam.formPattern);
        application.value.formValue.initFieldsValues();
      }
      // application.value.candidateExamId = application.value.candidateExam.id;
      // application.value.removeAllFieldValues();
      // application.value.postgraduateCourse.formPattern.removeAllFieldValues();
      // application.value.candidateExam.formPattern.initFieldsValues();
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      form,
      application,
      candidateExams,
      isEditMode,
      courseChangeHandler,
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
