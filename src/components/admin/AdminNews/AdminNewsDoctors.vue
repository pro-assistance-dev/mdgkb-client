<template>
  <el-card>
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
import News from '@/classes/News';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminNewsDoctors',
  components: { TableButtonGroup },
  setup() {
    const news: News = NewsStore.Item();
    const doctor: Doctor = DoctorsStore.Item();

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await DoctorsStore.Get(event.value);
      news.addDoctor(doctor);
    };

    const remove = (index: number) => {
      news.removeDoctor(index);
    };

    return {
      news,
      remove,
      selectSearch,
    };
  },
});
</script>
