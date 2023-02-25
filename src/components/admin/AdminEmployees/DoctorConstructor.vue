<template>
  <CollapseContainer>
    <template #default="scope">
      <div class="margin-container">
        <CollapseItem :tab-id="1036" :active-id="scope.activeId">
          <template #inside-title>
            <div class="title-in">Информация о статусе</div>
          </template>
          <template #inside-content>
            <div class="background-container">
              <el-form-item label="Ссылка на профиль в системе Московский врач">
                <el-input v-model="employee.doctor.mosDoctorLink" />
              </el-form-item>
              <el-form-item label="Краткое описание сферы интересов">
                <el-input v-model="employee.doctor.description" />
              </el-form-item>
            </div>
          </template>
        </CollapseItem>
      </div>
      <el-container direction="vertical">
        <el-checkbox v-model="employee.doctor.hasAppointment" label="Включить расписание приёма" />
        <div v-if="employee.doctor.hasAppointment" class="margin-container">
          <CollapseItem :active-id="scope.activeId" title="Расписание" :tab-id="2017" :is-collaps="false">
            <template #inside-content>
              <div class="background-container">
                <TimetableConstructorV2New :store-module="'doctors'" />
              </div>
            </template>
          </CollapseItem>
        </div>
      </el-container>
      <el-container direction="vertical">
        <div class="margin-container">
          <RemoteSearch
            :must-be-translated="true"
            :key-value="divisionModelName"
            placeholder="Начните вводить название отделения"
            @select="addDivision"
          />
          <CollapseItem :active-id="scope.activeId" title="Отделения" :tab-id="2017" :is-collaps="false">
            <template #inside-title> </template>

            <template #inside-content>
              <div class="background-container">
                <div v-for="(doctorDivision, i) in employee.doctor.doctorsDivisions" :key="doctorDivision">
                  {{ doctorDivision.division.name }}
                  <el-button
                    @click="
                      $classHelper.RemoveFromClassByIndex(i, employee.doctor.doctorsDivisions, employee.doctor.doctorsDivisionsForDelete)
                    "
                    >Удалить</el-button
                  >
                </div>
              </div>
            </template>
          </CollapseItem>
        </div>
      </el-container>
    </template>
  </CollapseContainer>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';

import Division from '@/classes/Division';
import DoctorDivision from '@/classes/DoctorDivision';
import Employee from '@/classes/Employee';
import TimetableConstructorV2New from '@/components/admin/TimetableConstructorV2New.vue';
import CollapseContainer from '@/components/Main/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import ClassHelper from '@/services/ClassHelper';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';
import StringsService from '@/services/Strings';

export default defineComponent({
  name: 'DoctorConstructor',
  components: {
    RemoteSearch,
    CollapseItem,
    CollapseContainer,
    TimetableConstructorV2New,
  },
  setup() {
    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);
    const division: Ref<Division> = computed(() => Provider.store.getters['divisions/item']);

    const addDivision = async (search: ISearchObject) => {
      const alreadyAdded = employee.value.doctor?.doctorsDivisions.find((d: DoctorDivision) => d.divisionId === search.value);
      if (alreadyAdded) {
        ElMessage('Выбранное отделение уже добавлено');
        return;
      }
      Provider.filterQuery.value.setParams(ClassHelper.GetPropertyName(Division).id as string, search.value);
      await Provider.store.dispatch('divisions/get', Provider.filterQuery.value);
      employee.value.doctor?.addDoctorDivision(division.value);
    };

    return {
      addDivision,
      divisionModelName: StringsService.toCamelCase(Division.GetClassName()),
      employee,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.container {
  position: relative;
  width: calc(100% - 60px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #dff2f8;
}

.column-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-item {
  width: 40%;
  margin-left: 0px;
}

.column-item2 {
  width: 60%;
  margin-left: 20px;
}

.column-item3 {
  width: 50%;
  margin-left: 20px;
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

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
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

.list-number {
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

.admin-del {
  position: absolute;
  top: 23px;
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
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del2:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-item {
  width: 40%;
  margin-left: 0px;
}

.column-item3 {
  width: 50%;
  margin-left: 20px;
}

.column-item3:first-child {
  width: 50%;
  margin-left: 0px;
}

.title {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #c4c4c4;
  margin: 10px;
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

@media screen and (max-width: 910px) {
  .column-block {
    display: block;
  }
  .column-item {
    width: 100%;
    margin-left: 0px;
  }
  .column-item2 {
    width: 100%;
    margin-left: 0px;
  }
  .column-item3 {
    width: 100%;
    margin-left: 0px;
  }

  .column-item3:first-child {
    width: 100%;
    margin-left: 0px;
  }
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
