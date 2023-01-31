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
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Teacher from '@/classes/Teacher';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'AdminEducationalOrganizationTeachers',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const doctors = computed(() => store.getters['doctors/items']);
    const educationalOrganization: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const newId = ref();
    const newPosition = ref('');

    const clearSelect = () => {
      newId.value = undefined;
      newPosition.value = '';
    };

    const add = () => {
      if (educationalOrganization.value.doctorExistsInTeachers(newId.value)) {
        ElMessage({ message: 'Выбранный преподаватель уже добавлен', type: 'error' });
        return;
      }
      const doctor = doctors.value?.find((i: IDoctor) => i.id === newId.value);
      const teacher = new Teacher();
      teacher.doctorId = newId.value;
      teacher.doctor = doctor;
      teacher.position = newPosition.value;
      educationalOrganization.value.addTeacher(teacher);
      clearSelect();
    };

    return {
      newPosition,
      educationalOrganization,
      newId,
      doctors,
      add,
      mounted,
      form,
    };
  },
});
</script>
