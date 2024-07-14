<template>
  <AdminListWrapper show-header>
    <template #header>
      <el-select v-model="newId" style="min-width: 400px" filterable placeholder="Выберите сотрудника">
        <el-option v-for="item in employees" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-button type="success" style="margin: 20px" @click="add"> Добавить </el-button>
    </template>

    <el-table :data="educationalAcademics">
      <el-table-column v-if="isEditMode" width="50" class-name="sticky-left" align="center">
        <template #default="scope">
          <TableMover :ordered-items="educationalAcademics" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="ФИО">
        <template #default="scope">
          {{ scope.row.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Ученая степень">
        <template #default="scope">
          {{ scope.row.employee.academicDegree }}
        </template>
      </el-table-column>
      <el-table-column label="Ученое звание">
        <template #default="scope">
          {{ scope.row.employee.academicRank }}
        </template>
      </el-table-column>
      <el-table-column width="50" class-name="sticky-right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import AcademicsSortsLib from '@/libs/sorts/AcademicsSortsLib';
import Hooks from '@/services/Hooks/Hooks';
const newId: Ref<string> = ref('');
const educationalAcademics: EducationalAcademic[] = AcademicsStore.Items();
const employees: Employee[] = EmployeesStore.Items();
const isEditMode: Ref<boolean> = ref(false);

const clearSelect = () => {
  newId.value = '';
};
const load = async () => {
  // Provider.setSortModel(EducationOrganizationAcademicsSortsLib.byOrder());
  // Provider.setLimit(9999);
  FTSP.Get().setS(AcademicsSortsLib.byOrder());
  FTSP.Get().p.limit = 999999;
  await AcademicsStore.FTSP();
  await EmployeesStore.GetAll();
  PHelp.AdminUI.Head.Set('Учёный совет', [
    Button.Success(
      computed(() => (isEditMode.value ? 'Сохранить' : 'Редактировать')),
      headBtnClick
    ),
  ]);
};
const headBtnClick = async () => {
  if (isEditMode.value) {
    await save();
  } else {
    isEditMode.value = true;
  }
};
const save = async () => {
  await AcademicsStore.UpdateMany();
  isEditMode.value = false;
};
const remove = async (id: string) => {
  await AcademicsStore.Remove(id);
};
const add = async () => {
  if (!newId.value) {
    PHelp.Notification.Warning('Необходимо выбрать сотрудника');
    return;
  }
  if (educationalAcademics.find((el) => el.employeeId == newId.value)) {
    PHelp.Notification.Warning('Выбранный сотрудник уже добавлен');
    return;
  }
  const newItem = new EducationalAcademic();
  newItem.employee = new Employee(employees.find((el) => el.id == newId.value));
  newItem.employeeId = newId.value;
  newItem.order = educationalAcademics.length;
  await AcademicsStore.Create(newItem);
  await load();
  clearSelect();
  PHelp.Notification.Success('Сотрудник добавлен');
  document.querySelector('.el-table__body-wrapper')?.scrollTo({ top: 9999, behavior: 'smooth' });
};

Hooks.onBeforeMount(load);
</script>
