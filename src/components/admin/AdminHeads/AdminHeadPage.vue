<template>
  <div v-if="mounted && !head.id" class="employee-name">
    <div class="search-line">
      <div class="search-label">Выберите сотрудника для добавления:</div>
      <RemoteSearch :key-value="schema.employee.key" :max-width="2000" @select="selectEmployeeSearch" />
    </div>
    <div v-if="head.employee.id" class="container">
      <button class="admin-employee-del" @click.prevent="head.resetEmployee()">Удалить</button>
      <div class="division-name">
        {{ head.employee.human.getFullName() }}
      </div>
    </div>
  </div>
  <el-form v-if="mounted" ref="form" :model="head" label-position="top" :rules="rules">
    <div class="margin-container">
      <CollapseItem :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Должность</div>
        </template>
        <template #inside-content>
          <div class="background-container">
            <el-form-item label="Должность" prop="position">
              <el-input v-model="head.position"></el-input>
            </el-form-item>
            <el-form-item label="Является главным врачом:" prop="isMain">
              <el-checkbox v-model="head.isMain">Да</el-checkbox>
            </el-form-item>
          </div>
        </template>
      </CollapseItem>
    </div>
    <div class="margin-container">
      <CollapseItem title="Контакты" :tab-id="1012" :collapsed="false">
        <template #inside-content>
          <ContactsForm :contact-info="head.contactInfo" />
        </template>
      </CollapseItem>
    </div>

    <div class="margin-container">
      <CollapseItem title="Расписание" :tab-id="2017" :collapsed="false">
        <template #inside-content>
          <div class="background-container">
            <TimetableConstructorV2New :store-module="'heads'" />
          </div>
        </template>
      </CollapseItem>
    </div>
  </el-form>

  <ImageCropper />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Employee from '@/classes/Employee';
import Head from '@/classes/Head';
import ContactsForm from '@/components/admin/Contacts/ContactsForm.vue';
import TimetableConstructorV2New from '@/components/admin/TimetableConstructorV2New.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IDepartment from '@/interfaces/IDepartment';
import ISearchObject from '@/interfaces/ISearchObject';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminHeadPage',
  components: { TimetableConstructorV2New, CollapseItem, RemoteSearch, ContactsForm },
  setup() {
    const form = ref();
    Provider.form = form;
    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);
    const department: Ref<IDepartment> = computed(() => Provider.store.getters['departments/item']);
    const head: Ref<Head> = computed(() => Provider.store.getters['heads/item']);

    const toEmployeeInfo = async (): Promise<void> => {
      await Provider.router.push(`/admin/employees/${head.value.employee.id}`);
    };

    const addDepartment = async (searchObject: ISearchObject) => {
      Provider.filterQuery.value.setParams(Provider.schema.value.department.id, searchObject.id);
      await Provider.store.dispatch('departments/get', Provider.filterQuery.value);
      head.value.addDepartment();
    };

    const selectEmployeeSearch = async (searchObject: ISearchObject) => {
      await Provider.store.dispatch('employees/get', searchObject.value);
      head.value.setEmployee(employee.value);
    };

    Hooks.onBeforeMount(Provider.loadItem, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? head.value.employee.human.getFullName() : 'Создать сотрудника')),
        showBackButton: true,
        buttons: Provider.route().params['id']
          ? [{ action: toEmployeeInfo, text: 'Личная информация', type: 'warning' }, { action: Hooks.submit() }]
          : [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave(Hooks.submit);

    return {
      addDepartment,
      head,
      form,
      mounted: Provider.mounted,
      selectEmployeeSearch,
      schema: Provider.schema,
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

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

.margin-container {
  margin: 0 0 10px 0;
}

.margin-container:first-child {
  margin: -10px 0 10px 0;
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

.container2 {
  position: relative;
  width: calc(100% - 60px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #dff2f8;
}

// .container {
//   position: relative;
//   width: calc(100% - 20px);
//   margin: 10px 0px 10px 0px;
//   border: 1px solid #c3c3c3;
//   border-radius: 5px;
//   padding: 12px 10px;
//   background: #f9fafb;
// }

.container {
  position: relative;
  width: calc(100% - 20px);
  margin: 10px 0px 10px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
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

.admin-del2 {
  position: absolute;
  top: 23px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del2:hover {
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

.list-number2 {
  position: absolute;
  top: 20px;
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

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
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

.division-name {
  width: calc(100% - 100px);
}

.admin-employee-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
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
  margin-top: 4px;
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

:deep(.el-checkbox__input) {
  margin-left: 24px;
}

:deep(.el-form) {
  padding: 0;
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 22px);
    margin: 0px 0px 20px 0px;
  }

  .container2 {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }

  .line {
    display: block;
  }
}
</style>
