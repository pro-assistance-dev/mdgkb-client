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
import { computed, defineComponent, Ref } from 'vue';

import SupportMessage from '@/classes/SupportMessage';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminHospitalizationsTypesList',
  components: { TableButtonGroup, AdminListWrapper },
  setup() {
    const hospitalizationsTypes: Ref<SupportMessage[]> = computed(() => Provider.store.getters['hospitalizationsTypes/items']);

    const loadHospitalizationsTypes = async () => {
      await Store.GetAll('hospitalizationsTypes');
    };

    const load = async () => {
      await loadHospitalizationsTypes();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Виды госпитализации',
      });
    };

    Hooks.onBeforeMount(load);

    return {
      hospitalizationsTypes,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
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
