<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="dpoApplication" :model="dpoApplication" label-position="top">
      <el-card style="margin-bottom: 20px">
        <template #header>
          <span>Информация о программе</span>
        </template>
        <el-form-item
          v-if="isEditMode && !dpoApplication.dpoCourseId"
          label="Выберите программу"
          prop="dpoCourseId"
          :rules="[{ required: true, message: 'Необходимо выбрать программу', trigger: 'change' }]"
        >
          <el-select
            v-model="dpoApplication.nmoCourse"
            value-key="id"
            placeholder="Выберите программу"
            style="width: 100%"
            @change="courseChangeHandler"
          >
            <el-option v-for="item in dpoCourses" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-descriptions v-else :column="1" border>
          <el-descriptions-item label="Наименование">{{ dpoApplication.nmoCourse.name }}</el-descriptions-item>
          <el-descriptions-item label="Тип программы">{{ dpoApplication.nmoCourse.isNmo ? 'НМО' : 'ДПО' }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <div v-if="dpoApplication.nmoCourse.id">
        <AdminFormValue :form="dpoApplication.formValue" :is-edit-mode="isEditMode" :email-exists="emailExists" @findEmail="findEmail" />
      </div>
      <el-card v-else style="color: red">Перед подачей заявления необходимо выбрать программу</el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import Form from '@/classes/Form';
import FormStatus from '@/classes/FormStatus';
import NmoCourse from '@/classes/NmoCourse';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Orders } from '@/services/interfaces/Orders';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminDpoApplicationPage',
  components: { AdminFormValue },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted = ref(false);
    const form = ref();
    const filterModel = ref();

    const dpoApplication: DpoApplication = DpoApplicationsStore.Item();
    const dpoCourses: ComputedRef<NmoCourse[]> = computed(() => store.getters['dpoCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактирования');

    watch(route, async () => {
      setProgramsType();
      await DpoApplicationsStore.GetAll();
    });
    const setProgramsType = () => {
      filterModel.value.boolean = route.meta.isNmo;
    };

    onBeforeMount(async () => {
      await loadDpoCourses();
      await loadItem();
      await updateNew();
      await findEmail();
    });

    const loadDpoCourses = async () => {
      setProgramsType();
      // await store.dispatch('dpoCourses/getAll', filterQuery.value);
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
      if (!dpoApplication.formValue.isNew) {
        return;
      }
      dpoApplication.formValue.isNew = false;
      await DpoApplicationsStore.Update();
    };

    let initialStatus: FormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await DpoApplicationsStore.Get(Router.Id());
        initialStatus = dpoApplication.formValue.formStatus;
        pageTitle = `Заявление от ${dpoApplication.formValue.user.email}`;
      } else {
        store.commit('dpoApplications/resetItem');
        pageTitle = 'Подача заявления ДПО';
        if (route.meta.isNmo) {
          pageTitle = 'Подача заявления НМО';
        }
        isEditMode.value = true;
      }
      store.commit('admin/setHeaderParams', {
        title: pageTitle,
        showBackButton: true,
        buttons: [{ text: editButtonTitle, type: 'primary', action: changeEditMode }, { action: submit }],
      });
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(dpoApplication, formUpdated, { deep: true });
    };

    const findEmail = async () => {};

    const submit = async (next?: NavigationGuardNext) => {
      dpoApplication.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !dpoApplication.formValue.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        dpoApplication.formValue.updateViewedByUser(initialStatus);
        await DpoApplicationsStore.Update();
      } else {
        dpoApplication.value.formValue.clearIds();
        await DpoApplicationsStore.Create();
      }
      const typeCourse = dpoApplication.value.nmoCourse.isNmo ? 'nmo' : 'dpo';
      next ? next() : await router.push(`/admin/${typeCourse}/applications`);
    };

    const courseChangeHandler = async () => {
      if (!route.params['id']) {
        dpoApplication.formValue.initFieldsValues();
      }
      await findEmail();
      // store.commit('dpoApplications/changeFormPattern', dpoApplication.value.nmoCourse.formPattern);
      // const newForm = new Form(dpoApplication.value.formValue);
      // dpoApplication.value.formValue.removeAllFieldsAndValues();
      // dpoApplication.value.formValue.applyFormPatternFields(dpoApplication.value.nmoCourse.formPattern);
      // dpoApplication.value.formValue.initFieldsValues();
      // store.commit('dpoApplications/setFormValue', dpoApplication.value.nmoCourse.formPattern);
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted,
      form,
      dpoApplication,
      dpoCourses,
      isEditMode,
      courseChangeHandler,
      findEmail,
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
