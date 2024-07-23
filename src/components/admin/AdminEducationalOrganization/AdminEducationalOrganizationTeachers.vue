<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите преподавателя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-input v-model="newPosition" placeholder="Роль руководителя" />
      <el-button type="success" style="margin: 20px" @click="add"> Добавить преподавателя </el-button>
    </el-space>

    <el-table :data="educationalOrganization.teachers">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.doctor.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Должность" sortable>
        <template #default="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-remove-button="true"
            @remove="
              $classHelper.RemoveFromClassByIndex(scope.$index, educationalOrganization.teachers, educationalOrganization.teachersForDelete)
            "
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminEducationalOrganizationTeachers',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const form = ref();
    const doctors = DoctorsStore.Items();
    const newId = ref();
    const newPosition = ref('');

    const clearSelect = () => {
      newId.value = undefined;
      newPosition.value = '';
    };

    const add = () => {
      // if (educationalOrganization.value.doctorExistsInTeachers(newId.value)) {
      //   ElMessage({ message: 'Выбранный преподаватель уже добавлен', type: 'error' });
      //   return;
      // }
      // const doctor = doctors.find((i: Doctor) => i.id === newId.value);
      // const teacher = new Teacher();
      // teacher.doctorId = newId.value;
      // teacher.doctor = doctor;
      // teacher.position = newPosition.value;
      // educationalOrganization.value.addTeacher(teacher);
      clearSelect();
    };

    return {
      newPosition,
      // educationalOrganization,
      newId,
      doctors,
      add,
      mounted,
      form,
    };
  },
});
</script>
