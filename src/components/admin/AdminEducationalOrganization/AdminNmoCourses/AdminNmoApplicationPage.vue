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
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import NmoCourse from '@/classes/NmoCourse';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import ISchema from '@/interfaces/schema/ISchema';
import SortModel from '@/services/classes/SortModel';
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

    const dpoApplication: ComputedRef<DpoApplication> = computed<DpoApplication>(() => store.getters['dpoApplications/item']);
    const dpoApplicationFormValue: ComputedRef<IForm> = computed<IForm>(() => store.getters['dpoApplications/formValue']);
    const filterQuery: ComputedRef<FilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);
    const dpoCourses: ComputedRef<NmoCourse[]> = computed(() => store.getters['dpoCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактирования');
    const emailExists: ComputedRef<boolean> = computed(() => store.getters['dpoApplications/emailExists']);

    watch(route, async () => {
      setProgramsType();
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
    });
    const setProgramsType = () => {
      filterModel.value.boolean = route.meta.isNmo;
      store.commit('filter/setFilterModel', filterModel.value);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadDpoCourses();
      await loadItem();
      await updateNew();
      await findEmail();
      store.commit('admin/closeLoading');
    });

    const loadDpoCourses = async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(schema.value.nmoCourse.tableName, schema.value.nmoCourse.name, Orders.Asc, 'По алфавиту', true)
      );
      filterModel.value = FilterModel.CreateFilterModel(schema.value.nmoCourse.tableName, schema.value.nmoCourse.isNmo, DataTypes.Boolean);
      filterQuery.value.pagination.cursorMode = false;
      setProgramsType();
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
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
      if (!dpoApplication.value.formValue.isNew) {
        return;
      }
      dpoApplication.value.formValue.isNew = false;
      await store.dispatch('dpoApplications/update', dpoApplication.value);
    };

    let initialStatus: IFormStatus;
    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('dpoApplications/get', route.params['id']);
        initialStatus = dpoApplication.value.formValue.formStatus;
        pageTitle = `Заявление от ${dpoApplication.value.formValue.user.email}`;
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

    const findEmail = async () => {
      await store.dispatch('dpoApplications/emailExists', dpoApplication.value.nmoCourse.id);
    };

    const submit = async (next?: NavigationGuardNext) => {
      dpoApplication.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !dpoApplication.value.formValue.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        dpoApplication.value.formValue.updateViewedByUser(initialStatus);
        await store.dispatch('dpoApplications/update');
      } else {
        dpoApplication.value.formValue.clearIds();
        await store.dispatch('dpoApplications/create');
      }
      const typeCourse = dpoApplication.value.nmoCourse.isNmo ? 'nmo' : 'dpo';
      next ? next() : await router.push(`/admin/${typeCourse}/applications`);
    };

    const courseChangeHandler = async () => {
      if (!route.params['id']) {
        store.commit('dpoApplications/setCourse', dpoApplication.value.nmoCourse);
        store.commit('dpoApplications/setFormValue', dpoApplication.value.nmoCourse.formPattern);
        dpoApplication.value.formValue.initFieldsValues();
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
      dpoApplicationFormValue,
      findEmail,
      emailExists,
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
