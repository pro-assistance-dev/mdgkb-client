<template>
  <el-card>
    <el-space>
      <RemoteSearch :key-value="schema.doctor.key" @select="selectSearch" />
    </el-space>
    <el-table :data="news.newsDoctors">
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
import { computed, ComputedRef, defineComponent } from 'vue';

import Doctor from '@/classes/Doctor';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import INews from '@/interfaces/news/INews';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminNewsDoctors',
  components: { TableButtonGroup, RemoteSearch },
  setup() {
    const news: ComputedRef<INews> = computed(() => Provider.store.getters['news/newsItem']);
    const doctor: ComputedRef<Doctor> = computed(() => Provider.store.getters['doctors/item']);

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.store.dispatch('doctors/get', event.value);
      news.value.addDoctor(doctor.value);
    };

    const remove = (index: number) => {
      news.value.removeDoctor(index);
    };

    return {
      news,
      remove,
      schema: Provider.schema,
      selectSearch,
    };
  },
});
</script>
