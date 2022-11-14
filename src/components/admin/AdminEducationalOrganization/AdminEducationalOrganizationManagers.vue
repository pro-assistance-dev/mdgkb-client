<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите руководителя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-input v-model="newRole" placeholder="Роль руководителя"> </el-input>
      <el-button type="success" style="margin: 20px" @click="add">Добавить руководителя</el-button>
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
              removeFromClass(
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
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import EducationalManager from '@/classes/EducationalManager';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import removeFromClass from '@/services/removeFromClass';
export default defineComponent({
  name: 'AdminEducationalOrganizationManagers',
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
    const newRole = ref();

    const clearSelect = () => {
      newId.value = undefined;
      newRole.value = '';
    };

    const add = () => {
      if (educationalOrganization.value.doctorExistsInManagers(newId.value)) {
        ElMessage({ message: 'Выбранный руководитель уже добавлен', type: 'error' });
        return;
      }
      const doctor = doctors.value?.find((i: IDoctor) => i.id === newId.value);
      const manager = new EducationalManager();
      manager.doctorId = newId.value;
      manager.doctor = doctor;
      manager.role = newRole.value;
      educationalOrganization.value.addManager(manager);
      clearSelect();
    };

    const remove = (index: number) => {
      store.commit('educationalOrganization/removeManager', index);
    };

    return {
      removeFromClass,
      newRole,
      educationalOrganization,
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
