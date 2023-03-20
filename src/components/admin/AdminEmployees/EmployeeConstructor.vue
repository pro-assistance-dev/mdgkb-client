<template>
  <CollapseContainer>
    <template #default="scope">
      <div class="margin-container">
        <CollapseItem title="Личная информация" :active-id="scope.activeId" :tab-id="1011" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <div class="background-container">
              <HumanForm :with-styles="false" store-module="employees" @input-name-complete="completeInput" />
            </div>
          </template>
        </CollapseItem>
      </div>
      <div class="margin-container">
        <CollapseItem title="Образование" :active-id="scope.activeId" :tab-id="1012" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <EducationForm :employee="employee" />
          </template>
        </CollapseItem>
      </div>
      <div class="margin-container">
        <CollapseItem title="Опыт работы" :active-id="scope.activeId" :tab-id="1013" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <div class="container">
              <el-form-item label="Совместитель">
                <el-checkbox v-model="employee.partTime" />
              </el-form-item>
            </div>

            <div class="tools-buttons">
              <button class="admin-add" @click.prevent="employee.addExperience()">+ Добавить</button>
            </div>
            <div v-for="(experience, i) in employee.experiences" :key="experience.id" class="container">
              <button class="admin-del" @click="employee.removeExperience(i)">Удалить</button>
              <div class="list-number">
                {{ i + 1 }}
              </div>
              <el-form-item label="Место работы">
                <el-input v-model="experience.place" />
              </el-form-item>
              <el-form-item label="Должность">
                <el-input v-model="experience.position" />
              </el-form-item>
              <div class="column-block">
                <div class="column-item3">
                  <el-form-item label="С:">
                    <DatePicker v-model="experience.start" />
                  </el-form-item>
                </div>
                <div class="column-item3">
                  <el-form-item label="По:">
                    <DatePicker v-model="experience.end" />
                  </el-form-item>
                </div>
              </div>
            </div>
          </template>
        </CollapseItem>
      </div>
      <div class="margin-container">
        <CollapseItem title="Сертификаты" :active-id="scope.activeId" :tab-id="1014" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <div class="tools-buttons">
              <button class="admin-add" @click.prevent="employee.addCertificate()">+ Добавить</button>
            </div>
            <div v-for="(certificate, i) in employee.certificates" :key="certificate.id" class="container">
              <button class="admin-del" @click.prevent="employee.removeCertificate(i)">Удалить</button>
              <div class="list-number">
                {{ i + 1 }}
              </div>
              <el-form-item label="Название сертификата">
                <el-input v-model="certificate.description" />
              </el-form-item>
              <el-form-item label="Загрузить сертификат">
                <UploaderSingleScan :height="238" :file-info="certificate.scan" @ratio="(e) => (element.ratio = e)" />
              </el-form-item>
            </div>
          </template>
        </CollapseItem>
      </div>
      <div class="margin-container">
        <CollapseItem title="Ученая степень, звание" :active-id="scope.activeId" :tab-id="1016" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <div class="background-container">
              <el-form-item label="Учёная степень">
                <el-input v-model="employee.academicDegree" />
              </el-form-item>
              <el-form-item label="Звание">
                <el-input v-model="employee.academicRank" />
              </el-form-item>
            </div>
          </template>
        </CollapseItem>
      </div>
      <div class="margin-container">
        <CollapseItem title="Регалии" :active-id="scope.activeId" :tab-id="1017" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <div class="tools-buttons">
              <button class="admin-add" @click.prevent="employee.addRegalia()">+ Добавить</button>
            </div>
            <div v-for="(regalia, i) in employee.regalias" :key="regalia" class="container">
              <button class="admin-del" @click.prevent="employee.removeRegalia(i)">Удалить</button>
              <div class="list-number">
                {{ i + 1 }}
              </div>
              <el-form-item label=" ">
                <el-input v-model="regalia.name" />
              </el-form-item>
            </div>
          </template>
        </CollapseItem>
      </div>
      <div class="margin-container">
        <CollapseItem title="Педагогическая деятельность" :active-id="scope.activeId" :tab-id="1018" @changeActiveId="scope.changeActiveId">
          <template #inside-content>
            <div class="tools-buttons">
              <button class="admin-add" @click.prevent="employee.addTeachingActivity()">+ Добавить</button>
            </div>
            <div v-for="(regalia, i) in employee.teachingActivities" :key="regalia" class="container">
              <button class="admin-del" @click.prevent="employee.removeTeachingActivity(i)">Удалить</button>
              <div class="list-number">
                {{ i + 1 }}
              </div>
              <el-form-item label=" ">
                <el-input v-model="regalia.name" />
              </el-form-item>
            </div>
          </template>
        </CollapseItem>
      </div>
    </template>
  </CollapseContainer>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Employee from '@/classes/Employee';
import Head from '@/classes/Head';
import EducationForm from '@/components/admin/EducationForm.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import DatePicker from '@/components/DatePicker.vue';
import CollapseContainer from '@/components/Main/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import Human from '@/services/classes/Human';
import EmployeesFiltersLib from '@/services/Provider/libs/filters/EmployeesFiltersLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'EmployeeConstructor',
  components: {
    HumanForm,
    EducationForm,
    UploaderSingleScan,
    CollapseItem,
    DatePicker,
    CollapseContainer,
  },
  setup() {
    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);
    const employees: Ref<Employee[]> = computed(() => Provider.store.getters['employees/items']);
    let filterModel: FilterModel = EmployeesFiltersLib.byFullName();

    const completeInput = async (human: Human) => {
      console.log('COMPLETEINPUT');
      filterModel.value1 = human.getFullName();
      Provider.setFilterModel(filterModel);
      await Provider.loadItems();
      if (employees.value.length === 0) {
        return;
      }
      await offerEditExistingDoctor();
    };

    const offerEditExistingDoctor = async () => {
      const existing = employees.value[0];
      if (!existing) {
        return;
      }
      ElMessageBox.confirm('Сотрудник с введённым именем уже существует в системе', 'Отредактировать существующего врача?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Перейти к редактированию',
        cancelButtonText: 'Остаться в создании нового',
      }).then(async () => {
        await Provider.router.push(`/admin/employees/${existing.human.slug}`);
        await Provider.loadItem();
      });
    };

    return {
      employees,
      completeInput,
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
