<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите преподавателя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-button type="success" style="margin: 20px" @click="add">Добавить научного руководителя</el-button>
    </el-space>

    <el-table :data="educationOrganisation.educationalOrganizationAcademics">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.doctor.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'AdminEducationalOrganizationAcademics',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const doctors = computed(() => store.getters['doctors/items']);
    const educationOrganisation: ComputedRef<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const newId = ref();

    const add = () => {
      const doctor = doctors.value?.find((i: IDoctor) => i.id === newId.value);
      educationOrganisation.value.addAcademic(doctor);
    };
    const remove = (index: number) => {
      educationOrganisation.value.removeAcademic(index);
    };

    return {
      educationOrganisation,
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
