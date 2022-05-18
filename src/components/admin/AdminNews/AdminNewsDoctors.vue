<template>
  <el-card>
    <el-space>
      <!-- {{ Provider.schema.value.doctor.key}} -->
      <RemoteSearch :key-value="Provider.schema.value.doctor.key" @select="selectSearch" />
      <!-- <el-select v-model="newId" filterable placeholder="Выберите врача">
        <el-option v-for="item in doctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
      </el-select>
      <el-button type="success" style="margin: 20px" @click="add">Добавить врача</el-button> -->
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

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IDoctor from '@/interfaces/IDoctor';
import ISearchObject from '@/interfaces/ISearchObject';
import INews from '@/interfaces/news/INews';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminNewsDoctors',
  components: { TableButtonGroup, RemoteSearch },
  setup() {
    const mounted = ref(false);
    const form = ref();
    const news: ComputedRef<INews> = computed(() => Provider.store.getters['news/newsItem']);
    const doctor: ComputedRef<IDoctor> = computed(() => Provider.store.getters['doctors/item']);

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.store.dispatch('doctors/get', event.id);
      news.value.addDoctor(doctor.value);
    };

    const remove = (index: number) => {
      news.value.removeDoctor(index);
    };

    return {
      news,
      remove,
      mounted,
      form,
      Provider,
      selectSearch,
    };
  },
});
</script>
