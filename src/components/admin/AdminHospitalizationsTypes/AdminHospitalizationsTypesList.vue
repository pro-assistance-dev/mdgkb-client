<template>
  <component :is="'AdminListWrapper'" v-if="mounted" show-header>
    <el-table v-if="hospitalizationsTypes" :data="hospitalizationsTypes">
      <el-table-column label="Страхование" sortable>
        <template #default="scope">
          {{ scope.row.policyType }}
        </template>
      </el-table-column>
      <el-table-column label="Лечение" sortable>
        <template #default="scope">
          {{ scope.row.treatmentType }}
        </template>
      </el-table-column>
      <el-table-column label="Стационар" sortable>
        <template #default="scope">
          {{ scope.row.stayType }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="$router.push(`/admin/hospitalizations-types/${scope.row.id}`)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HospitalizationType from '@/classes/HospitalizationType';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Hooks from '@/services/Hooks/Hooks';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminHospitalizationsTypesList',
  components: { TableButtonGroup, AdminListWrapper },
  setup() {
    const hospitalizationsTypes: HospitalizationType[] = HospitalizationsTypesStore.Items();

    const loadHospitalizationsTypes = async () => {
      await HospitalizationsTypesStore.GetAll();
    };

    const load = async () => {
      await loadHospitalizationsTypes();
      PHelp.AdminUI.Head.Set('Виды госпитализации', []);
    };

    Hooks.onBeforeMount(load);

    return {
      hospitalizationsTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

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
</style>
