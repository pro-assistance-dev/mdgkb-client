<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите руководителя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-input v-model="newRole" placeholder="Роль руководителя" />
      <el-button type="success" style="margin: 20px" @click="add"> Добавить руководителя </el-button>
    </el-space>

    <el-table :data="educationalOrganization.educationalOrganizationManagers">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.doctor.employee.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Роль руководителя" sortable prop="role" />
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-remove-button="true"
            @remove="
              $classHelper.RemoveFromClassByIndex(
                scope.$index,
                educationalOrganization.educationalOrganizationManagers,
                educationalOrganization.educationalOrganizationManagersForDelete
              )
            "
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Doctor from '@/classes/Doctor';
import EducationalManager from '@/classes/EducationalManager';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminEducationalOrganizationManagers',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const form = ref();
    const doctors = DoctorsStore.Items();
    const newId = ref();
    const newRole = ref();

    const clearSelect = () => {
      newId.value = undefined;
      newRole.value = '';
    };

    const add = () => {
      // if (educationalOrganization.value.doctorExistsInManagers(newId.value)) {
      //   ElMessage({ message: 'Выбранный руководитель уже добавлен', type: 'error' });
      //   return;
      // }
      const doctor = doctors.find((i: Doctor) => i.id === newId.value);
      const manager = new EducationalManager();
      manager.doctorId = newId.value;
      manager.doctor = doctor;
      manager.role = newRole.value;
      // educationalOrganization.value.addManager(manager);
      clearSelect();
    };

    const remove = () => {
      // store.commit('educationalOrganization/removeManager', index);
    };

    return {
      newRole,
      // educationalOrganization,
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
