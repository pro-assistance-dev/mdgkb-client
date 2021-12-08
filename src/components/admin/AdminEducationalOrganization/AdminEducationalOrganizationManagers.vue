<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите руководителя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-input v-model="newRole" placeholder="Роль руководителя"> </el-input>
      <el-button type="success" style="margin: 20px" @click="add">Добавить руководителя</el-button>
    </el-space>

    <el-table :data="managers">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.doctor.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Роль руководителя" sortable prop="role" />
      <el-table-column width="50" fixed="right" align="center">
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

import EducationalOrganizationManager from '@/classes/educationalOrganization/EducationalOrganizationManager';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'AdminEducationalOrganizationManagers',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const doctors = computed(() => store.getters['doctors/doctors']);
    const managers = computed(() => store.getters['educationalOrganization/managers']);
    const newId = ref();
    const newRole = ref();

    const add = () => {
      const doctor = doctors.value?.find((i: IDoctor) => i.id === newId.value);
      const manager = new EducationalOrganizationManager();
      manager.doctorId = newId.value;
      manager.doctor = doctor;
      manager.role = newRole.value;
      store.commit('educationalOrganization/addManager', manager);
    };
    const remove = (index: number) => {
      store.commit('educationalOrganization/removeManager', index);
    };

    return {
      newRole,
      managers,
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
