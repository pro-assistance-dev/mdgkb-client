<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите преподавателя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-button type="success" style="margin: 20px" @click="add">Добавить преподавателя</el-button>
    </el-space>

    <el-table :data="teachers">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.doctor.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import EducationalOrganizationTeacher from '@/classes/educationalOrganization/EducationalOrganizationTeacher';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDoctor from '@/interfaces/doctors/IDoctor';

export default defineComponent({
  name: 'AdminEducationalOrganizationTeachers',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const doctors = computed(() => store.getters['doctors/doctors']);
    const teachers = computed(() => store.getters['educationalOrganization/teachers']);
    const newId = ref();

    const add = () => {
      const doctor = doctors.value?.find((i: IDoctor) => i.id === newId.value);
      const teacher = new EducationalOrganizationTeacher();
      teacher.doctorId = newId.value;
      teacher.doctor = doctor;
      store.commit('educationalOrganization/addTeacher', teacher);
    };
    const remove = (index: number) => {
      store.commit('educationalOrganization/removeTeacher', index);
    };

    return {
      teachers,
      newId,
      doctors,
      add,
      remove,
      mounted,
      form,
    };
  },
});
</script>
