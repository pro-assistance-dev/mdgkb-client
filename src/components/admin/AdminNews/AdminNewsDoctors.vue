<template>
  <el-card>
    <el-space>
      <el-select v-model="newId" filterable placeholder="Выберите преподавателя">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-button type="success" style="margin: 20px" @click="add">Добавить врача</el-button>
    </el-space>
    <el-table :data="news.newsDoctors">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.doctor.human.getFullName() }}
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
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'AdminNewsDoctors',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const doctors = computed(() => store.getters['doctors/items']);
    const news: ComputedRef<INews> = computed(() => store.getters['news/newsItem']);
    const newId = ref();

    const add = () => {
      const doctor = doctors.value?.find((i: IDoctor) => i.id === newId.value);
      news.value.addDoctor(doctor);
    };
    const remove = (index: number) => {
      news.value.removeDoctor(index);
    };

    return {
      news,
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
