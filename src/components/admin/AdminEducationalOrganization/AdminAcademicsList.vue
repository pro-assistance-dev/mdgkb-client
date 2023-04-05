<template>
  <AdminListWrapper v-if="mounted" show-header>
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

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import EducationalAcademic from '@/classes/EducationalAcademic';
import Employee from '@/classes/Employee';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import Hooks from '@/services/Hooks/Hooks';
import EducationOrganizationAcademicsSortsLib from '@/services/Provider/libs/sorts/EducationOrganizationAcademicsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminAcademicsList',
  components: { TableButtonGroup, AdminListWrapper, TableMover },
  setup() {
    const newId: Ref<string> = ref('');
    const educationalAcademics: ComputedRef<EducationalAcademic[]> = computed(() => Provider.store.getters['educationalAcademics/items']);
    const employees: ComputedRef<Employee[]> = computed(() => Provider.store.getters['employees/items']);
    const isEditMode: Ref<boolean> = ref(false);

    const clearSelect = () => {
      newId.value = '';
    };
    const load = async () => {
      Provider.setSortModel(EducationOrganizationAcademicsSortsLib.byOrder());
      Provider.setLimit(9999);
      await Provider.store.dispatch('educationalAcademics/getAll', Provider.filterQuery.value);
      await Provider.store.dispatch('employees/getAllWithCount');
    };
    const save = async () => {
      await Provider.store.dispatch('educationalAcademics/updateMany');
      isEditMode.value = false;
    };
    const remove = async (id: string) => {
      await Provider.store.dispatch('educationalAcademics/remove', id);
    };
    const add = async () => {
      if (!newId.value) {
        ElMessage({ message: 'Необходимо выбрать сотрудника', type: 'error' });
        return;
      }
      if (educationalAcademics.value.find((el) => el.employeeId == newId.value)) {
        ElMessage({ message: 'Выбранный сотрудник уже добавлен', type: 'error' });
        return;
      }
      const newItem = new EducationalAcademic();
      newItem.employee = new Employee(employees.value.find((el) => el.id == newId.value));
      newItem.employeeId = newId.value;
      newItem.order = educationalAcademics.value.length;
      await Provider.store.dispatch('educationalAcademics/create', newItem);
      await load();
      clearSelect();
      ElMessage({ message: 'Сотрудник добавлен', type: 'success' });
      document.querySelector('.el-table__body-wrapper')?.scrollTo({ top: 9999, behavior: 'smooth' });
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Ученый совет',
        buttons: [
          {
            text: computed(() => (isEditMode.value ? 'Сохранить' : 'Редактировать')),
            action: computed(() => (isEditMode.value ? save : () => (isEditMode.value = !isEditMode.value))),
          },
        ],
      },
    });
    return {
      educationalAcademics,
      mounted: Provider.mounted,
      remove,
      add,
      newId,
      employees,
      isEditMode,
    };
  },
});
</script>
