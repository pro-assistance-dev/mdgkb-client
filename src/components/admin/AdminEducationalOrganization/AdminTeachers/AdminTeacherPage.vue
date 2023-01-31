<template>
  <div v-if="mounted && !teacher.id" class="employee-name">
    <div class="search-line">
      <div class="search-label">Выберите сотрудника для добавления:</div>
      <RemoteSearch :key-value="schema.employee.key" :max-width="2000" @select="selectEmployeeSearch" />
    </div>
    <div v-if="teacher.employee.id" class="container">
      <button class="admin-employee-del" @click.prevent="teacher.resetEmployee()">Удалить</button>
      <div class="division-name">
        {{ teacher.employee.human.getFullName() }}
      </div>
    </div>
  </div>
  <el-form v-if="mounted && teacher.employee.id" ref="form" :model="teacher" label-position="top" :rules="rules">
    <div class="margin-container">
      <CollapsContainer :tab-id="1036" :collapsed="true">
        <template #inside-title>
          <div class="title-in">Стаж преподавания, статус</div>
        </template>
        <template #inside-content>
          <div class="background-container"></div>
        </template>
      </CollapsContainer>
    </div>
    <div class="margin-container">
      <CollapsContainer :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Сертификация</div>
        </template>
        <template #inside-content>
          <div class="background-container"></div>
        </template>
      </CollapsContainer>
    </div>
    <div class="margin-container">
      <CollapsContainer :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Прочая информация</div>
        </template>
        <template #inside-content>
          <div class="background-container"></div>
        </template>
      </CollapsContainer>
    </div>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IEmployee from '@/interfaces/IEmployee';
import IHuman from '@/interfaces/IHuman';
import ISearchObject from '@/interfaces/ISearchObject';
import ITeacher from '@/interfaces/ITeacher';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminTeacherPage',
  components: {
    RemoteSearch,
    CollapsContainer,
  },
  setup() {
    const form = ref();
    const teacher: Ref<ITeacher> = computed(() => Provider.store.getters['teachers/item']);
    const teachers: Ref<ITeacher[]> = computed(() => Provider.store.getters['teachers/items']);
    const employee: Ref<IEmployee> = computed(() => Provider.store.getters['employees/item']);
    let filterModel: IFilterModel | undefined = undefined;
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }

      try {
        if (Provider.route().params['id']) {
          await Provider.store.dispatch('teachers/update', teacher.value);
        } else {
          await Provider.store.dispatch('teachers/create', teacher.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push('/admin/teachers');
    };

    const { saveButtonClick, beforeWindowUnload, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await Provider.store.dispatch('search/searchGroups');
      await loadTeacher();
    };

    Hooks.onBeforeMount(load);

    const toEmployeeInfo = async (): Promise<void> => {
      await Provider.router.push(`/admin/employees/${teacher.value.employee.human.slug}`);
    };

    const loadTeacher = async (): Promise<void> => {
      if (Provider.route().params['id']) {
        await Provider.store.dispatch('teachers/get', Provider.route().params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: teacher.value.employee.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: toEmployeeInfo, text: 'Личная информация', type: 'warning' }, { action: submit }],
        });
      } else {
        Provider.store.commit('teachers/resetState');
        Provider.store.commit('admin/setHeaderParams', {
          title: 'Добавить преподавателя',
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);

      filterModel = FilterModel.CreateFilterModel(
        Provider.schema.value.teacher.tableName,
        Provider.schema.value.teacher.fullName,
        DataTypes.String
      );
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const completeInput = async (human: IHuman) => {
      if (!filterModel) {
        return;
      }
      filterModel.value1 = human.getFullName();
      Provider.setFilterModels(filterModel);
      await Provider.store.dispatch('teachers/getAll', Provider.filterQuery.value);
      if (teachers.value.length === 0) {
        return;
      }
    };

    // const offerEditExistingDoctor = async () => {
    //   const existingDoctor = doctors.value[0];
    //   if (!existingDoctor) {
    //     return;
    //   }
    //   ElMessageBox.confirm('Врач с введённым именем уже существует в системе', 'Отредактировать существующего врача?', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: 'Перейти к редактированию',
    //     cancelButtonText: 'Остаться в создании нового',
    //   })
    //     .then(async () => {
    //       // Provider.router.push({ name: 'AdminEditDoctorPage', params: { id: existingDoctor.human.slug } });
    //       await Provider.router.push(`/admin/doctors/${existingDoctor.employee.human.slug}`);
    //       await loadDoctor();
    //     })
    //     .catch((action: string) => {
    //       if (action === 'cancel') {
    //         ElMessage({
    //           type: 'warning',
    //           message: 'Врач с введённым именем уже существует в системе',
    //         });
    //       }
    //     });
    // };

    const selectEmployeeSearch = async (searchObject: ISearchObject) => {
      await Provider.store.dispatch('employees/get', searchObject.value);
      teacher.value.setEmployee(employee.value);
    };

    return {
      teachers,
      completeInput,
      submit,
      teacher,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
      removeFromClass,
      selectEmployeeSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.el-card {
  background: #f9fafb;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
    background: #f9fafb;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-form--label-top .el-form-item) {
  display: flex;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}

:deep(.el-form) {
  padding: 0;
}

:deep(.el-form--label-top .el-form-item__label) {
  margin-right: 20px;
}

.search-line {
  display: block;
  align-items: center;
  justify-content: left;
}

.search-label {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
}

.margin-container {
  margin: 0 0 10px 0;
}

.margin-container:first-child {
  margin: -10px 0 10px 0;
}

.container {
  position: relative;
  width: calc(100% - 20px);
  margin: 10px 0px 10px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
}

.employee-name {
  height: auto;
  position: relative;
  width: calc(100% - 40px);
  margin: 10px 0px 20px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 20px;
  background: #dff2f8;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.admin-del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.admin-employee-del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
  padding: 1px 0;
}

.admin-employee-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.list-number {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

.division-name {
  width: calc(100% - 100px);
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
  .admin-del {
    position: absolute;
    top: 23px;
    right: 36px;
    border: none;
    background: inherit;
    color: #a3a9be;
    transition: 0.3s;
    cursor: pointer;
    padding: 1px 0px;
  }
  .background-container {
    margin: 0 10px 20px 10px;
  }
}
</style>
