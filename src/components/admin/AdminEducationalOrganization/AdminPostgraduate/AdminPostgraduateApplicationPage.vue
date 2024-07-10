<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="application" :model="application" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <div v-if="application.postgraduateCourse.id">
            <AdminFormValue :form="application.formValue" :is-edit-mode="isEditMode" :email-exists="emailExists" @findEmail="findEmail" />
          </div>
          <el-card v-else style="color: red">Перед подачей заявления необходимо выбрать программу</el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-card>
            <template #header>
              <span>Информация о программе</span>
            </template>
            <el-form-item
              v-if="isEditMode && !application.postgraduateCourseId"
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
                <el-option v-for="item in postgraduateCourses" :key="item.id" :label="item.getMainSpecialization()" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-descriptions v-else :column="1">
              <el-descriptions-item label="Наименование">
                {{ application.postgraduateCourse.getMainSpecialization().name }}
              </el-descriptions-item>
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

import FormStatus from '@/classes/FormStatus';
import PostgraduateApplication from '@/classes/PostgraduateApplication';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPostgraduteApplicationPage',
  components: { AdminFormValue },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();

    const application: ComputedRef<PostgraduateApplication> = computed<PostgraduateApplication>(
      () => store.getters['postgraduateApplications/item']
    );
    const postgraduateCourses: ComputedRef<PostgraduateCourse[]> = computed(() => store.getters['postgraduateCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактирования');
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['postgraduateApplications/emailExists']);

    onBeforeMount(async () => {
      await loadCourses();
      await loadItem();
      await updateNew();
      await findEmail();
    });

    const loadCourses = async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('postgraduateCourses/getAll');
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
      await store.dispatch('postgraduateApplications/emailExists', application.value.postgraduateCourse.id);
    };

    const updateNew = async () => {
      if (!route.params['id']) {
        return;
      }
      if (!application.value.formValue.isNew) {
        return;
      }
      application.value.formValue.isNew = false;
      await store.dispatch('postgraduateApplications/update', application.value);
    };

    let initialStatus: FormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('postgraduateApplications/get', route.params['id']);
        initialStatus = application.value.formValue.formStatus;
        pageTitle = `Заявление от ${application.value.formValue.user.email}`;
      } else {
        pageTitle = 'Подача заявления на обучение в аспирантуре';
        store.commit('postgraduateApplications/resetItem');
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
        await store.dispatch('postgraduateApplications/update');
      } else {
        application.value.formValue.clearIds();
        await store.dispatch('postgraduateApplications/create');
      }
      next ? next() : await router.push(`/admin/postgraduate-applications`);
    };

    const courseChangeHandler = async () => {
      if (!route.params['id']) {
        store.commit('postgraduateApplications/setCourse', application.value.postgraduateCourse);
        store.commit('postgraduateApplications/setFormValue', application.value.postgraduateCourse.formPattern);
        application.value.formValue.initFieldsValues();
      }
      await findEmail();
      // application.value.postgraduateCourseId = application.value.postgraduateCourse.id;
      // application.value.removeAllFieldValues();
      // application.value.postgraduateCourse.formPattern.removeAllFieldValues();
      // application.value.postgraduateCourse.formPattern.initFieldsValues();
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
      findEmail,
      emailExists,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

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
