<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="application" :model="application" label-position="top">
      <el-container direction="vertical">
        <el-card>
          <template #header>
            <span>Информация о программе</span>
          </template>
          <el-form-item
            v-if="isEditMode"
            label="Выберите программу"
            prop="postgraduateCourseId"
            :rules="[{ required: true, message: 'Необходимо выбрать программу', trigger: 'change' }]"
          >
            <el-select
              v-model="application.postgraduateCourse"
              value-key="id"
              placeholder="Выберите программу"
              style="width: 100%"
              @change="courseChangeHandler"
            >
              <el-option v-for="item in postgraduateCourses" :key="item.id" :label="item.name" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-descriptions v-else :column="1">
            <!--            <el-descriptions-item label="Наименование">{{ application.postgraduateCourse.name }}</el-descriptions-item>-->
            <!--            <el-descriptions-item label="Тип программы">{{ application.postgraduateCourse.isNmo ? 'НМО' : 'ДПО' }}</el-descriptions-item>-->
          </el-descriptions>
        </el-card>

        <el-card>
          <template #header>
            <span>Информация о заявителе</span>
          </template>
          <div v-if="isEditMode">
            <el-form-item
              label="Электронная почта"
              prop="user.email"
              :rules="[{ required: true, message: 'Необходимо указать email', trigger: 'blur' }]"
            >
              <el-input v-model="application.user.email" placeholder="Электронная почта"></el-input>
            </el-form-item>
            <el-form-item label="Фамилия" prop="user.human.surname">
              <el-input v-model="application.user.human.surname" placeholder="Фамилия"></el-input>
            </el-form-item>
            <el-form-item label="Имя" prop="user.human.name">
              <el-input v-model="application.user.human.name" placeholder="Имя"></el-input>
            </el-form-item>
            <el-form-item label="Отчество" prop="user.human.patronymic">
              <el-input v-model="application.user.human.patronymic" placeholder="Отчество"></el-input>
            </el-form-item>
          </div>
          <el-descriptions v-else :column="1">
            <el-descriptions-item label="Email">{{ application.user.email }}</el-descriptions-item>
            <el-descriptions-item label="ФИО">{{ application.user.human.getFullName() }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card v-if="isEditMode">
          <template #header>
            <span>Форма для подачи заявления</span>
          </template>
          <FieldValuesForm :form="application.candidateExam.formPattern" />
        </el-card>

        <el-card v-else>
          <template #header>
            <div class="flex-between">
              <span>Данные формы</span>
              <div class="flex">
                <span style="margin-right: 5px">Статус:</span>
                <el-tag v-if="application.isFieldValuesModChecked()" size="small" type="success">Данные проверены</el-tag>
                <el-tag v-else size="small" type="danger">Данные не проверены</el-tag>
                <el-button
                  :disabled="application.isFieldValuesModChecked()"
                  :type="application.isFieldValuesModChecked() ? 'success' : 'primary'"
                  size="small"
                  style="margin-left: 5px"
                  @click="application.changeFieldValuesModChecked(true)"
                >
                  Пометить все
                </el-button>
              </div>
            </div>
          </template>
          <FieldValuesFormResult :form="application.candidateExam.formPattern" />
        </el-card>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import FieldValuesFormResult from '@/components/FormConstructor/FieldValuesFormResult.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ISchema from '@/interfaces/schema/ISchema';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminCandidateApplicationPage',
  components: { FieldValuesFormResult, FieldValuesForm },

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
    const postgraduateCourses: ComputedRef<IDpoCourse[]> = computed(() => store.getters['postgraduateCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактиварония');

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadDpoCourses();
      await loadItem();
      await updateNew();
      store.commit('admin/closeLoading');
    });

    const loadDpoCourses = async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      await store.dispatch('postgraduateCourses/getAll');
    };

    const changeEditMode = () => {
      isEditMode.value = !isEditMode.value;
      if (isEditMode.value) {
        editButtonTitle.value = 'Режим просмотра';
      } else {
        editButtonTitle.value = 'Режим редактиварония';
      }
    };

    const updateNew = async () => {
      if (!route.params['id']) {
        return;
      }
      if (!application.value.isNew) {
        return;
      }
      application.value.isNew = false;
      await store.dispatch('candidateApplications/update', application.value);
    };

    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('candidateApplications/get', route.params['id']);
        pageTitle = `Заявка от ${application.value.user.email}`;
      } else {
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
      application.value.candidateExam.formPattern.validate();

      // store.commit('candidateApplications/setFieldValues', application.value.postgraduateCourse.formPattern);
      application.value.fieldValues = application.value.candidateExam.formPattern.fieldValues;
      saveButtonClick.value = true;
      if (!validate(form, true) || !application.value.candidateExam.formPattern.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        await store.dispatch('candidateApplications/update');
      } else {
        await store.dispatch('candidateApplications/create');
      }
      next ? next() : await router.push(`/admin/candidate-applications`);
    };

    const courseChangeHandler = () => {
      application.value.candidateExamId = application.value.candidateExam.id;
      // application.value.removeAllFieldValues();
      // application.value.postgraduateCourse.formPattern.removeAllFieldValues();
      application.value.candidateExam.formPattern.initFieldsValues();
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      form,
      application,
      postgraduateCourses,
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
