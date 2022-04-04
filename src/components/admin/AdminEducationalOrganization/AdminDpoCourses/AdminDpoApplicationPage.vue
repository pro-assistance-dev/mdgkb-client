<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="dpoApplication" :model="dpoApplication" label-position="top">
      <el-container direction="vertical">
        <el-card>
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
              v-model="dpoApplication.dpoCourse"
              value-key="id"
              placeholder="Выберите программу"
              style="width: 100%"
              @change="courseChangeHandler"
            >
              <el-option v-for="item in dpoCourses" :key="item.id" :label="item.name" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-descriptions v-else :column="1">
            <el-descriptions-item label="Наименование">{{ dpoApplication.dpoCourse.name }}</el-descriptions-item>
            <el-descriptions-item label="Тип программы">{{ dpoApplication.dpoCourse.isNmo ? 'НМО' : 'ДПО' }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <div v-if="dpoApplication.dpoCourse.id">
          <AdminFormValue :form="dpoApplication.formValue" :is-edit-mode="isEditMode" :email-exists="emailExists" @findEmail="findEmail" />
        </div>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import SortModel from '@/classes/filters/SortModel';
import AdminFormValue from '@/components/FormConstructor/AdminFormValue.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IForm from '@/interfaces/IForm';
import ISchema from '@/interfaces/schema/ISchema';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

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

    const dpoApplication: ComputedRef<IDpoApplication> = computed<IDpoApplication>(() => store.getters['dpoApplications/item']);
    const dpoApplicationFormValue: ComputedRef<IForm> = computed<IForm>(() => store.getters['dpoApplications/formValue']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);
    const dpoCourses: ComputedRef<IDpoCourse[]> = computed(() => store.getters['dpoCourses/items']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const isEditMode: Ref<boolean> = ref(false);
    const editButtonTitle: Ref<string> = ref('Режим редактиварония');
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
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.name, Orders.Asc, 'По алфавиту', true)
      );
      filterModel.value = FilterModel.CreateFilterModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.isNmo, DataTypes.Boolean);
      filterQuery.value.pagination.cursorMode = false;
      setProgramsType();
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
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
      if (!dpoApplication.value.formValue.isNew) {
        return;
      }
      dpoApplication.value.formValue.isNew = false;
      await store.dispatch('dpoApplications/update', dpoApplication.value);
    };

    const loadItem = async () => {
      let pageTitle = '';
      if (route.params['id']) {
        await store.dispatch('dpoApplications/get', route.params['id']);
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
      await store.dispatch('dpoApplications/emailExists', dpoApplication.value.dpoCourse.id);
    };

    const submit = async (next?: NavigationGuardNext) => {
      dpoApplication.value.formValue.validate();
      saveButtonClick.value = true;
      if (!validate(form, true) || !dpoApplication.value.formValue.validated) {
        saveButtonClick.value = false;
        return;
      }
      if (route.params['id']) {
        await store.dispatch('dpoApplications/update');
      } else {
        dpoApplication.value.formValue.clearIds();
        await store.dispatch('dpoApplications/create');
      }
      const typeCourse = dpoApplication.value.dpoCourse.isNmo ? 'nmo' : 'dpo';
      next ? next() : await router.push(`/admin/${typeCourse}/applications`);
    };

    const courseChangeHandler = async () => {
      if (!route.params['id']) {
        store.commit('dpoApplications/setCourse', dpoApplication.value.dpoCourse);
        store.commit('dpoApplications/setFormValue', dpoApplication.value.dpoCourse.formPattern);
        dpoApplication.value.formValue.initFieldsValues();
      }
      await findEmail();
      // store.commit('dpoApplications/changeFormPattern', dpoApplication.value.dpoCourse.formPattern);
      // const newForm = new Form(dpoApplication.value.formValue);
      // dpoApplication.value.formValue.removeAllFieldsAndValues();
      // dpoApplication.value.formValue.applyFormPatternFields(dpoApplication.value.dpoCourse.formPattern);
      // dpoApplication.value.formValue.initFieldsValues();
      // store.commit('dpoApplications/setFormValue', dpoApplication.value.dpoCourse.formPattern);
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
