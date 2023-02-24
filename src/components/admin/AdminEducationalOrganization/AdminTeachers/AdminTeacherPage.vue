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
      <CollapseItem :tab-id="1036" :collapsed="true">
        <template #inside-title>
          <div class="title-in">Стаж преподавания, статус</div>
        </template>
        <template #inside-content>
          <div class="background-container"></div>
        </template>
      </CollapseItem>
    </div>
    <div class="margin-container">
      <CollapseItem :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Сертификация</div>
        </template>
        <template #inside-content>
          <div class="background-container"></div>
        </template>
      </CollapseItem>
    </div>
    <div class="margin-container">
      <CollapseItem :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Прочая информация</div>
        </template>
        <template #inside-content>
          <div class="background-container"></div>
        </template>
      </CollapseItem>
    </div>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Employee from '@/classes/Employee';
import FilterModel from '@/classes/filters/FilterModel';
import Teacher from '@/classes/Teacher';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IHuman from '@/interfaces/IHuman';
import ISearchObject from '@/interfaces/ISearchObject';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import TeachersFiltersLib from '@/services/Provider/libs/filters/TeachersFiltersLib';

export default defineComponent({
  name: 'AdminTeacherPage',
  components: {
    RemoteSearch,
    CollapseItem,
  },
  setup() {
    const form = ref();
    Provider.form = form;
    const teacher: Ref<Teacher> = Provider.item;
    const teachers: Ref<Teacher[]> = Provider.items;
    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);

    let filterModel: FilterModel = TeachersFiltersLib.byFullName();

    const toEmployeeInfo = async (): Promise<void> => {
      await Provider.router.push(`/admin/employees/${teacher.value.employee.human.slug}`);
    };

    const completeInput = async (human: IHuman) => {
      filterModel.value1 = human.getFullName();
      Provider.setFilterModels(filterModel);
      await Provider.store.dispatch('teachers/getAll', Provider.filterQuery.value);
      if (teachers.value.length === 0) {
        return;
      }
    };

    const selectEmployeeSearch = async (searchObject: ISearchObject) => {
      await Provider.store.dispatch('employees/get', searchObject.value);
      teacher.value.setEmployee(employee.value);
    };

    Hooks.onBeforeMount(Provider.loadItem, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? teacher.value?.employee.human?.getFullName() : 'Добавить сотрудника')),
        showBackButton: true,
        buttons: [
          {
            text: 'Личная информация',
            type: 'warning',
            condition: computed(() => !!teacher.value?.employee.id),
            action: () => Provider.router.push(`/admin/employees/${teacher.value?.employee.id}`),
          },
          { action: Hooks.submit() },
        ],
      },
    });
    Hooks.onBeforeRouteLeave();

    return {
      teachers,
      completeInput,
      teacher,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
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
